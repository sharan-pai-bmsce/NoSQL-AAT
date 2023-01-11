const fs = require('fs');

const User = require('../Model/User');
const Reports = require('../Model/Reports');
const { populate } = require('../Model/User');


exports.getReports = (req,res,next) => {
    Reports.find({
        processing: true,
        signed: false
    },{
        details: 0,
        processing: 0,
        signed: 0    
    })
    .populate('userId','name sex DOB')
    .populate('testId','category subCategory appointmentTime')
    .then((reports) => {
        return res.status(200).json({
            message: "Reports to be signed",
            reports: reports
        })
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: err
        })
    })
}

exports.getReportDetails = (req,res,next) => {
    const reportId = req.params.id;
    Reports.findById(reportId,{
        processing: 0,
        signed: 0
    })
    .populate('userId','name email DOB sex')
    .then((report)=>{
        return res.status(200).json({
            message: "Report details",
            report: report
        });
    })
}

exports.postRemarks = (req,res,next) => {
    const remarks = req.body.remarks === "" ? "No Remarks":req.body.remarks;
    const reportId = req.body.reportId;
    const userId = req.body.userId;
    Reports.findById(reportId)
    .then((report)=>{
        let details = {...report.details, remarks: remarks};
        report.details = details;
        report.signed = true;
        return report.save();
    })
    .then((report)=>{
        // console.log(report.details);
        return User.findById(userId);
    })
    .then((user)=>{
        const index = user.reports.findIndex((report)=>{
            return report.reportId.toString() === reportId;
        })
        user.reports[index].status = "Doctor Signature over. Report ready for download."
        return user.save();
    })
    .then((user)=>{
        return res.status(200).json({
            message: "Report generation initiated"
        });
    });
}