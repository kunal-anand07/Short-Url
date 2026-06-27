const express = require("express");
const shortid = require("shortid");
const URL = require("../models/url");

async function generateShortUrl(req, res) {
    const body = req.body;
    const shortId = shortid();
    await URL.create({
        shortId: shortId,        
        redirectedId: body.url,  
        visitedHistory: [],
    });
    return res.render("Home",{
        id: shortId ,
    });
    
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory,
    });
}

module.exports = {
    generateShortUrl,
    getAnalytics,
};