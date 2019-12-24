
import React from 'react'
import {setCurrentUser,verifyToken,filterEnterpriseData} from '../actions/authActions'
import {SET_USER_ENTERPRISE} from '../actions/types'
import {prepareTypeDataBooking} from '../actions/bookActions'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import {notification,Button} from 'antd'
import {removeStorage,getStorage} from './helper'


import * as crypt from './crypt'

const openNotificationConfirmEnterprise = (store,data) => {
    const key = `open${Date.now()}`;
    console.log(data);
    const btn = (
        <Button type="primary" size="small" onClick={() => {
            store.dispatch({
                type: SET_USER_ENTERPRISE,
                data
            })
            notification.close(key)
        }}>
            Yes
        </Button>
    );
    notification.open({
        duration:25,
        message: 'Login Successfully',
        description: (<div>you are about to login to the PhotoSesh Retail Marketplace. <br/> Would you like to proceed or would you instead prefer to login to the PhotoSesh Enterprise Plan exclusively for {data.code} partners ?</div>),
        btn,
        key,
        onClose:notification.close(key),
    });
};

export default function (store) {
    try {

        if (getStorage('access_token')) {

            setAuthorizationToken(getStorage('access_token'));

            verifyToken()
            .then(res=>{
                let data = res.data.data;

                if(data.isEnterprise && !getStorage('enterprise')){
                    openNotificationConfirmEnterprise(store,data.enterpriseData)
                }

                let user = filterEnterpriseData(data)
                console.log(user);


                if(getStorage('enterprise')){
                    user = data
                }

                store.dispatch(setCurrentUser(user));
            },({response})=>{
                removeStorage('access_token');
                removeStorage('bookinfo');
                window.location.href = '/'
            })

        }


        if (getStorage('bookinfo')) {
            let data_booking = JSON.parse(crypt.decode(getStorage('bookinfo')))
            store.dispatch(prepareTypeDataBooking(data_booking));
        }

        return;
    } catch (e) {
        // Unable to load or parse stored state, proceed as usual
    }
}