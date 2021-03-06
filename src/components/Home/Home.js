import JSONTree from 'react-json-tree'
import style from './home.css'
import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {convertCommitsTree} from '../../utils/helper'
import { Row, Col,Table ,Icon,Tree} from 'antd';
import moment from 'moment'
import { Select } from 'antd';

const { Option } = Select;
const github_api = process.env.REACT_APP_GITHUB_API
const { TreeNode } = Tree;




class HomePage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            expandkeys : [],
            commits : [],
            authorUsername :'kennj2016',
            repoName :'test-app-show-commits',
            branchs:[]
        }

    }


    componentWillMount(){
        const  {
            commits ,
            authorUsername ,
            repoName
        } = this.state



        axios.get(github_api + `/repos/${authorUsername}/${repoName}/branches`).
        then(res=>{


            console.log(res.data);

           this.setState({branchs:res.data})

        })
        axios.get(github_api + `/repos/${authorUsername}/${repoName}/commits`).
        then(res=>{



           this.setState({commits:convertCommitsTree(res.data),expandkeys:res.data})

        })
    }

    render() {
        let  {
            expandkeys,
            commits ,
            authorUsername ,
            repoName,
            branchs
        } = this.state

        console.log({commits});
        let getChildNode = (nodes)=>{
            return nodes.map(object=>{
                return (
                    <TreeNode autoExpandParent={true}  title={object.commit.message} key={object.sha}> {getChildNode(object.children)} </TreeNode>
                )
            })
        }

        return (
            <div className="home-page" style={{
                maxWidth: 1366,
                margin: '50px auto',
                padding: 110,
                background: '#f5f5f5'}}>
                <Row>
                    <Col span={24}>
                        <div>

                            <p>link repo : <a href="https://github.com/kennj2016/test-app-show-commits">https://github.com/kennj2016/test-app-show-commits</a></p>

                            <p>repo name : {repoName}</p>
                            <p>authorUsername : {authorUsername}</p>
                        </div>


                        <div>


                        </div>

                        <div className={'commits-box'}> Commits (Master branch)

                            <Tree
                                autoExpandParent={true}
                                defaultExpandedKeys={expandkeys.map(commit=>commit.sha)}
                                showLine
                                switcherIcon={<Icon type="down" />}
                            >
                                {
                                    getChildNode(commits)

                                }

                            </Tree>
                        </div>

                        <div>
                            data json fetch from api
                            <JSONTree data={expandkeys} />
                        </div>
                        <div>
                            data after convert
                            <JSONTree data={commits} />
                        </div>



                    </Col>

                </Row>

            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps)(HomePage)