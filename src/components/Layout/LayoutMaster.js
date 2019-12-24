import style from './layoutmaster.css'
import React from 'react'
import {Layout} from 'antd'

const { Content} = Layout;

const LayoutMaster = ({ children,location }) => {

    return (
        <Layout className={style.right_layout}>
            <Content >
                {children}
            </Content>
        </Layout>

    )
};
export default LayoutMaster

