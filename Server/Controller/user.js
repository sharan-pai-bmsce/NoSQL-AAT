const fs = require('fs');

const express = require('express');
const PdfDocument = require('pdfkit');

const categoryColl = require('../Model/Categories');
const Appointment = require('../Model/Appointment');
const User = require('../Model/User');
const Schedule = require('../Model/Schedule');
const Reports = require('../Model/Reports');

let generatePdf = (res,report,user) => {
    const doc = new PdfDocument();
    const reportName = user.name+'_'+report._id+'.pdf';
    const reportPath = './Reports/'+reportName;
    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
        "Content-disposition",
        'inline; filename="' + reportName + '"'
    );
    const ageDifMs = Date.now() - new Date(user.DOB).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    doc.pipe(res);
    // doc.pipe(fs.createWriteStream(reportPath));
    doc
    .text('Report id: '+report._id.toString(),50,75)
    .text('Name: '+user.name,300,75)
    .text('Age: '+age+' years',50,90)
    .text('Collected Date: '+new Date(report.details.reportedDate).toISOString(),300,90)
    .text('Sex: '+user.sex,50,105)
    .text('Reported Date: '+new Date(Date.now()).toISOString(),300,105)
    
    doc
    .text(report.details.category,250,150)
    .text(report.details.subCategory,250,175)
    let tableTop = 220;
    doc
    // .text('Sl.No.',50,tableTop)
    .text('Test',50,tableTop)
    .text('Value',240,tableTop)
    .text('Unit',350,tableTop)
    .text('Reference',450,tableTop)

    report.details.attributes.forEach((attribute,index) => {
        tableTop+=20;
        doc
        // .text(""+(index+1),50,tableTop)
        .text(attribute.test,50,tableTop)
        .text((!attribute.value?"":attribute.value),235,tableTop)
        .text((!attribute.unit?"":attribute.unit),325,tableTop)
        .text((!attribute.reference?"":attribute.reference),455,tableTop)
    });
    doc.text("Remarks: "+report.details.remarks,50,tableTop+40)
    tableTop+=70;
    doc.image(report.doctor.degreeUrl,440,tableTop+40,{width: 160,height: 80});
    doc
    .text("Verified By:",450,tableTop+135)
    .text(report.doctor.name,450,tableTop+150)
    .text(report.doctor.degree,450,tableTop+165)
    doc.end()
    // return res.status(201).json({
    //     message: "PDF successfully created"
    // })
}


exports.getCategory = (req,res,next) => {
    categoryColl.find({},{
        category:1,
        subCategory: 1,
        attributes:{

            test: 1
        }
    })
    .then((categories)=>{
        return res.status(200).json({
            message: "Categories",
            categories: categories
        });
    })
    .catch((err)=>{
        return res.status(500).json({
            err: err
        })
    })
}

exports.getAppointments = (req,res,next) => {
    const userId = req.headers['authorization'];
    console.log(userId);
    Appointment.find({
        userId: userId
    })
    .populate('tests',{
        category:1,
        subCategory: 1,
        attributes:{
            test: 1
        }
    })
    .then((appointments)=>{
        return res.status(200).json({
            appointments: appointments
        })
    })
    
}

exports.postAppointment = (req, res, next) => {
    const userId = req.headers['authorization'];
    console.log(userId);
    let subCategories = req.body.subCategories;
    const startTime = new Date(req.body.start);
    const endTime = new Date(req.body.end);
    subCategories = subCategories.map((subCategory) => {
        return {
            'subCategory': subCategory
        }
    });
    Schedule.findOne({
        time: startTime
    })
        .then((schedule) => {
            if (schedule == null) {
                schedule = new Schedule({
                    time: startTime,
                    count: 0,
                })
            }
            schedule.count += subCategories.length;
            return schedule.save();
        })
        .then((schedule) => {
            console.log(schedule);
            return categoryColl.find({
                $or: subCategories
            })
        })
        .then((categoryObj) => {
            console.log(categoryObj);
            let appointment = new Appointment({
                userId: userId,
                startTime: startTime,
                endTime: endTime,
                tests: categoryObj
            })
            return appointment.save();
        })
        .then((appointment) => {
            // console.log(appointment._id);
            return User.findByIdAndUpdate(userId, {
                $push: {
                    appointments: appointment._id
                }
            })
        })
        .then((user) => {
            // console.log(user);
            // console.log(user.appointments.appointmentId);
            return res.status(201).json({
                message: "Appointment Created",
                id: user,
            });
        })
        .catch(error => {
            console.log(error);
            return error;
        })
}

exports.getTime = (req,res,next) => {
    const startDate = new Date(req.params.date);
    const endDate = new Date(startDate.valueOf() + (24*60*60*1000));
    console.log(startDate);
    Schedule.find({
        time:{
            $gte: startDate,
            $lt: endDate
        }
    })
    .then((schedules)=>{
        console.log(schedules);
        return res.status(200).json({
            "message":"Slots",
            slots: schedules
        })
    })
    .catch((err)=>{
        return res.status(500).json({
            "message":"Slots",
            slots: err
        })
    })
}

exports.getReports = (req,res, next) => {
    const userId = req.userId;
    User.findById(userId)
    .populate('reports.categoryId','category subCategory')
    .then((user)=>{
        return res.status(200).json({
            message: "Reports",
            reports: user.reports
        })
    })
    .catch(err=>{
        return res.status(500).json({
            "message":"Slots",
            slots: err
        })
    })
}

exports.getReport = (req,res,next) => {
    const reportId = req.params.reportId;
    let tempReport = null;
    Reports.findOne({
        _id:reportId,
        signed: true
    },{
        details: 1,
        userId: 1,
        _id: 1,
        doctor: 1
    })
    .populate('doctor','name degree degreeUrl')
    .then(report => {
        if(report===null){
            return res.status(403).json({
                message: "Report cannot be generated. The required processes not yet complete."
            })
        }
        tempReport = report;
        // console.log(report);
        return User.findById(report.userId,{
            name:1,
            DOB:1,
            sex:1
        })
        .then(user=>{
            // console.log(user);
            return generatePdf(res,tempReport,user)
        });
    })
}