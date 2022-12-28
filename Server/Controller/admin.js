const express = require('express');
const Category = require('../Model/Categories');

exports.postCategory = async (req,res,next) => {
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

exports.getAppointments = async (req,res,next) => {

}

exports.getReport = async (req,res,next) => {
    
}

