import React, { useEffect, useRef, useState } from 'react'
import getDataSrvHD from '../../service/getServiceHeader.js'
import './Createform.css'
import Button from 'react-bootstrap/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoShieldCheckmark, IoHourglassOutline, IoArrowBackCircleSharp, IoArrowDown, IoArrowForward } from "react-icons/io5";
import ModelAttachFile from '../FileAttached/ModelAttachFile.jsx';
import Chat from '../Chat/Chat.jsx'
import FormModalDetail from './FormDetail.jsx';
import FormCreate from './FormCreate.jsx';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import moment from 'moment';


function Createform() {
    //const section = localStorage.getItem("section");
    // const section = Cookies.get('section')
    const section = Cookies.get('section')
    const [openAttrFile, setOpenAttrFile] = useState(false);
    const [openModalChat, setOpenModalChat] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [ecrnoSelected, setEcrnoSelected] = useState('');
    const [statusCreateAppBit, setStatusCreateAppBit] = useState('');
    const permission = useSelector((state) => state.reducer.permission);
    const permissionActive = useSelector((state) => state.reducer.permissionActive);
    const [selectSection, setSelectSection] = useState(permission[0]?.grpRoleSect);


    const IconCheck = (val) => {
        var icon = '';
        if (val == 'U') {
            icon = <IoHourglassOutline style={{ color: "rgb(237 180 34)", fontSize: "30px" }} />
        } else if (val == 'F' || val != '') {
            icon = <IoShieldCheckmark style={{ color: "#11c045", fontSize: "30px" }} />
        } if (val == 'R') {
            icon = <IoArrowBackCircleSharp style={{ color: "rgb(248 6 23)", fontSize: "33px" }} />
        }
        return icon;
    }



    const handleShow = () => {
        setOpenModalCreate(true)
    };
    // **************************************************


    const [getdata, setGetdata] = useState([])
    useEffect(() => {
        loadPage();
    }, [])


    function loadPage() {
        // setddlStatus(sectionArray[buffIndexSection]);
        // if (buffIndexSection != '999') {
        //     setindexddlStatus(buffIndexSection) /// วิธีหา Index จาก value โดยใช้ IndexOf
        // } else {
        //     setindexddlStatus('999')
        // }


        // getDataSrvHD.getECRList(DocNo, sectionArray[buffIndexSection]).then((res) => {
        //     try {
        //         setGetdata(res.data)
        //     }
        //     catch (error) {
        //         console.log(error);
        //         return error;
        //     }
        // });

        getDataSrvHD.getECRList(DocNo, selectSection).then((res) => {
            try {
                setGetdata(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    }


    //// **************DAILOG DETAIL  *************************
    const handleCloseDetail = () => setShowDetail(false);


    const [loadStatusCreate, setLoadStatusCreate] = useState(false);
    useEffect(() => {
        if (loadStatusCreate == true) {
            setOpenModalDetail(true);
        }
    }, [loadStatusCreate])

    const handleShowDetail = (ecrno) => {
        setLoadStatusCreate(false);
        getDataSrvHD.getStatusCreate(ecrno).then((res) => {
            try {
                setStatusCreateAppBit(res.data)
                setEcrnoSelected(ecrno);
                setLoadStatusCreate(true);
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };



    /// ****************** END DAILOG DETAIL   *****************


    //**************************** ddl Status ************ */
    const grpSection = (val) => {
        var varGrpSection = '';

        if (val == 'ADMIN') {
            varGrpSection = "CREATE"
        }
        else {
            varGrpSection = permission[0]?.grpRoleSect;
        }
        return varGrpSection;
    }
    const [ddlStatus, setddlStatus] = useState(grpSection(permission[0]?.grpRoleSect));


    const grp = (val) => {
        var varGrp = '';

        if (val == 'ADMIN') {
            varGrp = "0"
        }
        else if (val == 'PU') {
            varGrp = "1"
        }
        else if (val == 'DD') {
            varGrp = "2"
        }
        else if (val == 'EN') {
            varGrp = "3"
        }
        else if (val == 'SQC') {
            varGrp = "4"
        }
        else if (val == 'QC') {
            varGrp = "5"
        }
        else if (val == 'DIL') {
            varGrp = "6"
        }
        else if (val == 'QA') {
            varGrp = "7"
        }
        else {
            varGrp = '999'
        }
        return varGrp;
    }


    const [indexddlStatus, setindexddlStatus] = useState(grp(ddlStatus));
    const [buffIndexSection, setBuffIndexSection] = useState(grp(ddlStatus));
    const handleChange = (event) => {
        setSelectSection(event.target.value);
        // if (event.target.value != 'ALL') {
        //     setBuffIndexSection(sectionArray.indexOf(event.target.value))
        // } else {
        //     setBuffIndexSection('999')
        // }
    };
    //****************************END ddl Status ************ */



    //**************************** BUTTON SEARCH ************ */
    // ส่ง DocNo กับ Status ไป API
    const [DocNo, setDocNo] = useState(('%'));
    const getSearch = (event) => {
        // setddlStatus(sectionArrayAll[buffIndexSection]);
        // if (buffIndexSection != '999') {
        //     setindexddlStatus(buffIndexSection) /// วิธีหา Index จาก value โดยใช้ IndexOf
        // } else {
        //     setindexddlStatus('999')
        // }

        // getDataSrvHD.getECRList(DocNo, sectionArray[buffIndexSection]).then((res) => {
        //     try {
        //         setGetdata(res.data)
        //     }
        //     catch (error) {
        //         console.log(error);
        //         return error;
        //     }
        // });



        getDataSrvHD.getECRList(DocNo, selectSection).then((res) => {
            try {
                setGetdata(res.data)
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    };


    function handleChangeSearch(value) {
        if (value == "") {
            var doc = "%"
            setDocNo(doc);
        }
        else {
            setDocNo(value);
        }
    }
    //****************************END BUTTON SEARCH ************ *



    const sectionArray = ['CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const sectionArrayAll = ['ALL', 'CREATE', 'PU', 'DD', 'EN', 'SQC', 'QC', 'DIL', 'QA']
    const stepArrat = ['receive', "issue", 'check', 'approve'];
    return (<>
        <div className='stylePagee'>
            <div class="card ">
                <h5 class="card-header bg-info text-white border-0">สร้างเอกสาร ECR</h5>
                <div class="card-body">
                    <div class="row">
                        😉🤣😍😒😁🤞👏💋🌹🎂✔🤳💖😢😎🎶🤳💕
                        <div class="col-1">Search :</div>
                        <div class="col-2">
                            <input type="text" class="form-control" onChange={(event) => handleChangeSearch(event.target.value)} />
                        </div>
                        <div class="col-1">Section :</div> &nbsp;&nbsp;&nbsp;
                        <div className='divddl'>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Status</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // value={buffIndexSection != '999' ? sectionArrayAll[buffIndexSection] : 'ALL'}
                                    value={selectSection}
                                    label="Status"
                                    onChange={handleChange}>
                                    {
                                        sectionArrayAll.map((item, index) =>
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )
                                    }

                                </Select>
                            </FormControl>
                        </div>
                        <div class="col-1">
                            <button type="submit" class="btn btn-primary mb-2" onClick={getSearch}>Search</button>
                        </div>
                        <div class="col-4">
                        </div>

                        <div class="col-2">
                            {
                                permission.filter((item) => {
                                    return item.menuCode == "BTN0001" && item.rolE_VIEW == "True"
                                }).length ? <Button variant="primary" onClick={handleShow} >สร้างเอกสาร ECR ใหม่</Button>
                                    :
                                    ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <br></br>

            <div class="row">
                <div class="col-2">
                    จำนวนเอกสาร = <span style={{ color: 'blue' }}>{getdata[0]?.summary}</span>
                </div>
                <div class="col-4"></div>
                <div class="col-3"></div>
                <div class="col-3">
                    <span><b>R</b> = Receive</span> &nbsp;&nbsp;&nbsp;
                    <span><b>I</b> = Issued</span> &nbsp;&nbsp;&nbsp;
                    <span><b>C</b> = Checked</span> &nbsp;&nbsp;&nbsp;
                    <span><b>A</b> = Approved</span>
                </div>
            </div>
            <br></br>
            <div style={{ overflowX: 'auto' }}>
                <table className='tableCreateform'>
                    <thead>
                        <tr>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)', width: '6%' }}>On Process</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}></th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>DocNo</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>Title</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>Section</th>
                            <th colSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>Detail</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>CREATE</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>PU</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>DD</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>EN</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>SQC</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>QC</th>
                            <th colSpan={2} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>DIL</th>
                            <th rowSpan={3} style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>QA</th>
                        </tr>

                        <tr style={{ color: 'white', backgroundColor: 'rgb(15 107 145)' }}>
                            <th>File</th>
                            <th>Remark</th>
                            <th>Print</th>
                            <th>(DIL Design Section)</th>
                            <th>(DIL Quality Control Section)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getdata?.map((item, index) => {
                                let oCols = ['cre', 'pu', 'dd', 'en', 'sqc', 'qc', 'dil_dd', 'dil_qc', 'qa'];
                                let oApps = ['received', 'issued', 'check', 'approved'];
                                let oEcr = [];
                                oCols.map((items, idx) => {
                                    let iECR = {
                                        key: items, app: []
                                    }
                                    oApps.map((iApp, idxx) => {
                                        let name = item[`${items}${iApp}by`]; // by
                                        let date = item[`${items}${iApp}date`]; // date
                                        let status = item[`${items}${iApp}bit`]; //bit
                                        // console.log(getdata)
                                        let color = 'rgb(246 239 239)';
                                        if (status == 'F') {
                                            color = 'rgb(19 255 19)';
                                        } else if (status == 'R') {
                                            color = 'red'
                                        }
                                        else {
                                            color = 'rgb(246 239 239)'
                                        }
                                        let icon = '';
                                        if (status == "F" || status == "R") {
                                            if (iApp == "received" || iApp == "issued" || iApp == "check") {
                                                icon = <IoArrowDown style={{ color: "rgb(28 3 217)" }} />
                                            }
                                            else {
                                                icon = <IoArrowForward style={{ color: "rgb(147 12 158)" }} />
                                            }
                                        }

                                        iECR.app.push({
                                            name: name,
                                            date: date,
                                            status: status,
                                            color: color,
                                            title: iApp,
                                            icon: icon,
                                        });
                                    });
                                    oEcr.push(iECR);
                                });

                                var status = ''
                                sectionArray.filter((vSec, iSec) => {
                                    status = item[`${vSec.toLowerCase()}_status`] == 'U' ? (status == '' ? vSec : status) : status;
                                });



                                return <tr>
                                    <td style={{ backgroundColor: (status != '' ? 'rgb(251 237 23)' : 'rgb(72 229 23)') }}><h5 style={{ color: (status != '' ? 'red' : 'rgb(60 3 255)') }}>{(status != '' ? status : 'FINISH')}</h5>
                                    </td>
                                    <td><center><Button variant="primary" onClick={() => handleShowDetail(item.ecrno)} >Report</Button></center>
                                    </td>
                                    <td>{item.ecrno}</td>
                                    <td>{item.title}</td>
                                    <td>{item.section}</td>
                                    <td><img src='/public/asset/Image/File.png' onClick={() => {
                                        setEcrnoSelected(item)
                                        setOpenAttrFile(true);
                                    }} /></td>
                                    <td>
                                        <div>
                                            <center>
                                                <img src='/public/asset/Image/Chat2.png' onClick={() => {
                                                    setEcrnoSelected(item)
                                                    setOpenModalChat(true);
                                                }} />
                                                <span className='content'>{item.count}</span>
                                            </center>
                                        </div>
                                    </td>
                                    <td><a href={`/Print/${item.ecrno}`} target="_blank" rel="noreferrer">
                                        <img src="/public/asset/Image/Print2.png" />
                                    </a></td>
                                    {
                                        oEcr.map((vSec, iSec) => {
                                            return <td>{
                                                vSec.app.map((vApp, iApp) => {
                                                    return <div style={{ display: 'flex' }}>
                                                        <div style={{ backgroundColor: vApp.color, width: '25%', borderBottom: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bolder' }}> <div>{vApp.title.substring(0, 1).toUpperCase()}  {vApp.icon}</div>
                                                        </div>
                                                        <div style={{ width: '75%', fontSize: '11px ', height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid black' }}>{vApp.name} <br></br>{vApp.date}</div>
                                                    </div>
                                                })
                                            }</td>
                                        })
                                    }
                                </tr>
                            })
                        }
                    </tbody >
                </table>
            </div>
        </div >


        <ModelAttachFile
            show={openAttrFile}
            // onHide={setOpenAttrFile}
            close={setOpenAttrFile}
            item={ecrnoSelected}
            section={section}
        />

        <FormCreate
            show={openModalCreate}
            close={setOpenModalCreate}
            refresh={loadPage}
            section={permission[0]?.grpRoleSect}
        />


        <FormModalDetail
            show={openModalDetail}
            close={setOpenModalDetail}
            ecrno={ecrnoSelected}
            refresh={loadPage}
            // section={permission[0]?.grpRoleSect}
            // position={permission[0]?.grpRole}
            // step={permission[0]?.grpRole}
            statusCreateAppBit={statusCreateAppBit[0]?.createapproved}
        />


        <Chat
            show={openModalChat}
            // onHide={() => setOpenModalChat(false)}
            close={setOpenModalChat}
            item={ecrnoSelected}
        />
    </>
    )
}


export default Createform