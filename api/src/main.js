#!/usr/bin/env node
import Database from 'better-sqlite3';
import open, { apps } from 'open';
import dotenv from 'dotenv';
import fs from 'fs';
import {
    
} from ' '

// Config the enviorment vars
dotenv.config();

// Get the arguements passed
const args = process.argv.slice(2);
const command = args[0];
const favorite = args[1];
const url = args[2];

// Using Sqlite db in current dir
let db;
const dbPath = 'favorites.db';

function init() {
    console.log('initializing database...');
    db = new Database(dbPath);

    const createTable = `
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            url TEXT NOT NULL
        )
    `;

    db.exec(createTable);

    const data = [
        { name: 'googs', url: 'https://google.com' },
        { name: 'face', url: 'https://facebook.com' },
        { name: 'newz', url: 'https://nbc.com' },
    ];

    const insertData = db.prepare(
        'INSERT INTO favorites (name, url) VALUES (?, ?)'
    );

    // Insert mock data
    data.forEach((favorite) => {
        insertData.run(favorite.name, favorite.url);
    });
}

function getBrowser() {
    // Get the browser from enviorment vars
    const browser = process.env?.BROWSER?.toLocaleLowerCase();

    let appName = browser;
    switch (browser) {
        case 'chrome':
            appName = apps.chrome;
            break;
        case 'firefox':
            appName = apps.firefox;
            break;
        case 'edge':
            appName = apps.edge;
            break;
        default : 
            appName = apps.chrome;
            break;
    }
    return appName;
}

function getMenu() {
    console.log('ls                     : Get all favorites.');
    console.log('add <favorite> <url>   : add a new favorite for some URL');
    console.log('open <favorite>        : Open a saved favorite.');
    console.log('rm <favorite>          : remove a saved favorite.');
}

// Gets all the defined favorites added
function getFavorite(favorite) {
    const row = db
        .prepare('SELECT * FROM favorites WHERE name = ?')
        .get(favorite);

    if (!row) {
        console.log('Favorite not found.');
        process.exit(1);
    }
    const url = row.url;
    const appName = getBrowser();

    if (appName) {
        open(url, { app: { name: appName } });
    } else {
        open(url);
    }
}

function add(favorite, url) {
    db.prepare('INSERT INTO favorites (name, url) VALUES (?, ?)').run(
        favorite,
        url
    );
    console.log('adding', favorite, url);
}

function rm(favorite) {
    db.prepare('DELETE FROM favorites WHERE name = ?').run(favorite);
    console.log('removing', favorite);
}

function ls() {
    const favorites = db.prepare('SELECT * FROM favorites').all();
    console.log('All favorites:');
    favorites.forEach((favorite) => {
        console.log(`${favorite.name}: ${favorite.url}`);
    });
}

if (!fs.existsSync(dbPath)) {
    init();
} else {
    db = new Database(dbPath);
}

const argCount = args.length;

// Get commands based on arguement count (better than switch)
const commands = {
    ls: { f: ls, argCount: 1 },
    open: { f: getFavorite, argCount: 2 },
    rm: { f: rm, argCount: 2 },
    add: { f: add, argCount: 3 },
};

if (
    argCount === 0 ||
    !commands[command] ||
    argCount < commands[command].argCount
) {
    getMenu();
    process.exit(1);
}

commands[command].f(favorite, url);
