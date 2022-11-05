import React, { useState, useEffect } from "react";
import { message } from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import { UPLOAD_MUTATE } from './../../../../components/GraphQL/upload.graphql';
import { ME } from "components/GraphQL/me.graphql";
import { UPDATE_USER } from './../../../../components/GraphQL/user.graphql';
import Upload from "./../../../../components/uploadProfile"
import { useTranslation } from 'react-i18next';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';


const Settings = () => {


    const { t } = useTranslation();
    const [upload, { loading: UploadLoading, error: UploadError, data: DataUplad }] = useMutation(UPLOAD_MUTATE);
    const [updateUser, { loading: LoadingUpdate, error: ErrorUpdate, data: DataUpdate }] = useMutation(UPDATE_USER);
    const { loading: LoadingMe, error: ErrorMe, data: DataMe } = useQuery(ME);
    const [profile, setprofile] = useState({
        name: DataMe?.me.name,
        lastname: DataMe?.me.lastname,
        cin: DataMe?.me.cin,
        email: DataMe?.me.email,
        phone: DataMe?.me.phone
    });
    const OnChange = (e) => {
        setprofile({ ...profile, [e.target.name]: e.target.value });
        console.log("Test Chnage", profile)
    }
    const [active, setActive] = React.useState('home');

    if (LoadingUpdate)
        return message.loading('Please Wait');

    if (ErrorUpdate)
        return message.error(ErrorUpdate.message);

        const formUpload = (e) => {
            e.preventDefault();
            upload({ variables: { attachment: e.target.files[0] } });
          }
        
        
          let Gallery, Profile
          if (DataUplad) {
            Gallery = DataUplad?.upload?.map(({ __typename, ...rest }) => rest);
            Profile = Gallery[0]
          }

          console.log("Avatar",Profile)
    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        try {
            const UpdateUser = await updateUser({
                variables: {

                    "input": {
                        id: DataMe?.me.id,
                        name: profile.name,
                        lastname: profile.lastname,
                        cin: profile.cin,
                        email: profile.email,
                        phone: profile.phone,
                        profile: {
                            upsert: {
                              avatar:Profile
                            }
                        }
                    }
                },
            });
            return UpdateUser;
        }
        catch (e) {
            console.log(e);
        }
    };
    console.log("profile", profile)
    return (

        <div className="contentOverview">



            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">{t("General_Settings")}</div></div>
                    <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
                </div>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab={t("General")} key="1">
                        <div className="ProfileSetting">
                            <div className="myvectore circle">
{/* <img src={DataMe?.me?.profile?.avatar.original}/> */}
                                <Upload
                                    loading={UploadLoading}
                                    isThereAFile={DataUplad}
                                    url={Profile?.original?
                                    (Profile?.original):(DataMe?.me?.profile?.avatar.original)

                                    }
                                   
                                    UploadFile={formUpload}
                                    uploadImage={upload}
                                />
                            </div>
                            {/* <div className="AvatarSetting"><img src={DataMe?.me.profile?.original ? (DataMe?.me.profile?.original) : ("/images/profile.png")} /></div> */}
                            <div className="NameSetting">{DataMe?.me.name} {DataMe?.me.lastname}</div>
                            <form className="inputSetting" onSubmit={handleUpdateProduct}>
                                {/* <input className="InSetting w100" placeholder="Project name" /> */}
                                <div className="Inputflex">
                                    <input onChange={OnChange} name="name" value={profile.name} className="InSetting w50" placeholder="First name" />
                                    <input onChange={OnChange} name="lastname" value={profile.lastname} className="InSetting w50" placeholder="Last name" />
                                </div>
                                <input onChange={OnChange} name="email" value={profile.email} className="InSetting w100" placeholder="Email address" />
                                <input onChange={OnChange} name="phone" value={profile.phone} className="InSetting w100" placeholder="Phone number" />
                                <input onChange={OnChange} value={profile.cin} className="InSetting w100" placeholder="cin" name="cin" disabled />

                                <div className="validationbutton"><button className="sumbit send">{t("Send")}</button></div>
                            </form>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Ads")} key="2">

                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Communication")} key="3">

                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Permissions")} key="4">

                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("Search")} key="5">

                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("SEO")} key="5">

                    </Tabs.TabPane>
                </Tabs>


            </div>
        </div>
    )
}

export default Settings
