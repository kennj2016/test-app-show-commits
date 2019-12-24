import style from './home.css'
import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import { Row, Col,Table ,Tag,Divider} from 'antd';

const github_api = process.env.REACT_APP_GITHUB_API






class HomePage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            commits : [],
            authorUsername :'kennj2016',
            repoName :'test-app-show-commits'
        }

    }



    componentWillMount(){
        const  {
            commits ,
            authorUsername ,
            repoName
        } = this.state
        axios.get(github_api + `/repos/${authorUsername}/${repoName}/commits`).
        then(res=>{

           this.setState({commits:res.data})

        })

        console.log();
    }

    render() {
        const  {
            commits ,
            authorUsername ,
            repoName
        } = this.state




        const columns = [
            {
                title: 'Commit',
                dataIndex: 'commit',
                key: 'commit',
                render:(text,record)=>{

                    return (

                        <div>
                            message : <strong>{record.commit.message} </strong><br/>
                            sha : {record.sha}
                        </div>
                    )
                }
            },     {
                title: 'By',
                dataIndex: 'by',
                key: 'by',
                render:(text,record)=>{

                    return (
                        <div>
                            name : {record.commit.committer.name} ({record.commit.committer.email}) <br/>
                            date : {record.commit.committer.date}
                        </div>
                    )
                }
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            }
        ];

        console.log('test branch 2');

        return (
            <div className="home-page" style={{maxWidth:1366,margin:'0 auto'}}>
                <Row>
                    <Col span={24}>
                        <div>

                            <p>link repo : <a href="https://github.com/kennj2016/test-app-show-commits">https://github.com/kennj2016/test-app-show-commits</a></p>

                            <p>repo name : {repoName}</p>
                            <p>authorUsername : {authorUsername}</p>
                        </div>


                        <div>
                            {

                                commits.map(commit =>{

                                    return (<div>



                                    </div>)

                                })
                            }

                            <Table columns={columns} dataSource={commits} />
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