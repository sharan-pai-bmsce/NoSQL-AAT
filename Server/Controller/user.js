const express = require('express');

const categoryColl = require('../Model/Categories');
exports.postAppointment = async (req,res,next) => {
    userId = req.userId;
    subCategories = req.body.subCategories;
    startTime = new Date(req.body.start);
    endTime = new Date(req.body.end);
    tests = subCategories.map((subCategory)=>{
        categoryColl.find({
            subCategory: subCategory
        })
        .then((categoryObj)=>{
            return categoryObj._id.toString();
        })
        .catch(error=>{
            console.log(error);
            return error;
        })
    });
    console.log(tests);
    res.status(201).json({
        message: "Appointment Created"
    })
    
}