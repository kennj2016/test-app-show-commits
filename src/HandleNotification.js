import React from 'react'
import {EVENT_TYPE} from './define'
import Pusher from 'pusher-js';
import {reloadBookings,getBookings} from './actions/projectAction'
import {setCurrentUser,verifyToken,filterEnterpriseData} from './actions/authActions'
import { Button, notification,Icon } from 'antd';


export  const openNotificationWithIcon = (title,message,type,icon=null) => {
    notification[type]({
        message: title,
        description: message,
        duration: 25,
        icon
    });
};



Pusher.logToConsole = true;

var pusher = new Pusher( process.env.PUSHER_KEY || 'd76814ba3b1cc91956e2', {
    cluster: 'ap1',
    encrypted: true
});
export function startPusherNotification(store,user){

    const  {_id,enterpriseData} = user
    console.log(user);

    var channel = pusher.subscribe('photosesh_react_' + _id );
    var channel_enterprise = pusher.subscribe('photosesh_react_' + enterpriseData.code );
    channel_enterprise.bind(EVENT_TYPE.ADMIN_ENTERPRISE_HAS_UPDATED, function(pusherData) {

        verifyToken()
            .then(res=>{
                let data = res.data.data;
                let user = filterEnterpriseData(data)
                store.dispatch(setCurrentUser(user));
            })
    });
    channel.bind(EVENT_TYPE.USER_VERIFY_EMAIL_SUCCESS, function(pusherData) {
        console.log(pusherData);
        window.location.href = '/'
    })
    channel.bind(EVENT_TYPE.AGENT_ACCEPT_APPOINTMENT, function(pusherData) {

        getBookings().then(res=>{

            if (res.data.data) {

                let {upcomingAppointment,pastAppointment} = res.data.data

                upcomingAppointment = upcomingAppointment.map(item=>{ item.type = 'upcoming' ; return item })
                pastAppointment = pastAppointment.map(item=>{ item.type = 'previous' ; return item })

                let data = [...upcomingAppointment,...pastAppointment];

                console.log(pusherData);

                openNotificationWithIcon('Congratulations !!! ',pusherData.message,'success')

                reloadBookings(store,data)

            }
        },err=>{

        })



    });


    channel.bind(EVENT_TYPE.AGENT_DECLINE_APPOINTMENT, function(pusherData) {

        getBookings().then(res=>{

            if (res.data.data) {

                let {upcomingAppointment,pastAppointment} = res.data.data

                upcomingAppointment = upcomingAppointment.map(item=>{ item.type = 'upcoming' ; return item })
                pastAppointment = pastAppointment.map(item=>{ item.type = 'previous' ; return item })

                let data = [...upcomingAppointment,...pastAppointment];


                openNotificationWithIcon('Photographer Rejected The Changes !!! ',pusherData.message,'error',(<Icon type="frown-o" />))

                reloadBookings(store,data)

            }
        },err=>{

        })



    });

    channel.bind(EVENT_TYPE.AGENT_APPROVE_EXTRATIME, function(pusherData) {

        getBookings().then(res=>{

            if (res.data.data) {

                let {upcomingAppointment,pastAppointment} = res.data.data

                upcomingAppointment = upcomingAppointment.map(item=>{ item.type = 'upcoming' ; return item })
                pastAppointment = pastAppointment.map(item=>{ item.type = 'previous' ; return item })

                let data = [...upcomingAppointment,...pastAppointment];

                openNotificationWithIcon('Congratulations !!! ',pusherData.message,'success')
                reloadBookings(store,data)

            }
        },err=>{

        })



    });



}
