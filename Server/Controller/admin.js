const express = require('express');
const bcrypt = require('bcryptjs');


const Appointment = require('../Model/Appointment');
const Category = require('../Model/Categories');
const Reports = require('../Model/Reports');

const Doctor = require('../Model/Doctor');
const User = require('../Model/User');

exports.postCategory = async (req, res, next) => {
    const name = req.body.category;
    const type = req.body.subCategory;
    const attributes = req.body.attributes;
    const category = new Category({
        category: name,
        subCategory: type,
        attributes: attributes
    })
    // console.log(attributes);
    await category.save()
    res.status(201).json({
        message: "Category created"
    })
}

exports.getAppointments = async (req, res, next) => {
    const startDate = new Date(req.params.startDate);
    const endDate = startDate.valueOf() + (24 * 60 * 60 * 1000);
    Appointment.find({
        startTime: {
            $gte: startDate
        },
        endTime: {
            $lt: endDate
        }
    })
        .then((docs) => {
            return res.status(200).json({
                message: "Appointments",
                appoint: docs
            })
        })
}

exports.getAppointmentDetail = (req, res, next) => {
    const id = req.params.id;
    Appointment.findById(id)
        .populate("userId", "name email sex DOB")
        .populate("tests", "subCategory category")
        .then((docs) => {
            console.log(docs);
            return res.status(200).json({
                "message": "Appointment Details",
                user: docs
            })
        })
}

exports.putReport = (req, res, next) => {
    // _id of appointment for deleting from appointment
    // userId
    // tests
    const id = req.body.id;
    const userId = req.body.userId;
    const tests = req.body.tests;
    let appointmentTime = null;
    let reports = null;
    Appointment.findByIdAndDelete(id)
        .then((appointment) => {
            appointmentTime = appointment.startTime;
            if (appointment == null) {
                return res.status(402).json({
                    message: "Appointment already removed"
                });
            }
            reports = tests.map(test => {
                return new Reports({
                    processing: false,
                    signed: false,
                    testId: test,
                    userId: userId,
                    doctor: "63b03a92e644b1f72a03a9e4"
                })
            });

            return Reports.insertMany(reports)
                .then((reports) => {
                    this.reports = reports;
                    return User.findById(userId)
                })
                .then((user) => {
                    user.appointments = user.appointments.filter((appointment) => appointment.toString() !== id);
                    this.reports.forEach(report => {
                        user.reports.push({
                            reportId: report._id,
                            status: "Test is Done. Still Results have to be computed.",
                            appointmentTime: appointmentTime,
                            categoryId: report.testId
                        })
                    })
                    return user.save();
                })
                .then((user) => {
                    return res.status(201).json({
                        message: "Appointment Done. Report processing initiated.",
                        user: user
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: "Error",
                err: err
            });
        });
}

exports.getReports = (req, res, next) => {
    Reports.find({
        processing: false
    })
    .populate('userId','name')
    .populate('testId','category subCategory')
    .populate('doctor','name')
    .then((reports)=>{
        return res.status(200).json({
            message: "Reports",
            reports: reports
        });
    })
}

exports.getReport = (req, res, next) => {
    const reportId = req.params.reportId;
    Reports.findById(reportId)
    .populate('userId','name DOB sex')
    .populate('testId')
    .populate('doctor','name')
    .then((report)=>{
        return res.status(200).json({
            message: "Reports",
            reports: report
        });
    });
}


exports.postReport = (req,res,next) => {
    const reportId = req.body.reportId;
    const userId = req.body.userId;
    const body = req.body.content;
    // let report = null;
    body['reportedDate'] = Date.now();
    Reports.findById(reportId)
    .then((report)=>{
        if(!report.processing)
        report.details = body;
        report.processing = true;
        return report.save();
    })
    .then((report)=>{
        // this.report = report;
        return User.findById(userId);
    })
    .then((user)=>{
        const index = user.reports.findIndex((report)=>report.reportId.toString() === reportId);
        user.reports[index].status = "Report generated. Waiting for doctor's review";
        return user.save();
    })
    .then((user)=>{
        return res.status(201).json({
            message: "Report Generated",
            user: user
        })
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).json({
            message: err
        });
    })
}

exports.postDoctor = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const doctor = new Doctor({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                degreeUrl: req.body.degreeUrl,
                degree: req.body.degree,
            })

            return doctor.save();
        })
        .then((doctor) => {
            return res.status(201).json({
                message: "Doctor created",
                doctor: doctor
            })
        })
}

