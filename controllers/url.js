const express = require("express");
const shortid = require("shortid");
const URL = require("../models/url");

async function generateShortUrl(req, res) {
    const body = req.body;
    const shortId = shortid();
    await URL.create({
        shortId: shortId,        // ✅ variable, not function
        redirectedId: body.url,  // ✅ lowercase to match request body
        visitedHistory: [],
    });
    return res.json({ id: shortId });
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