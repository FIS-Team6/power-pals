import React from 'react';

export function navToMyProfile() {
    window.location.href = "/routes/my-profile";
}

export function navTo(path) {
    window.location.href = path;
}

export function navToHome() {
    window.location.href = "/home";
}

export function navToLogin() {
    window.location.href = "/login";
}

export function navToDashboard() {
    window.location.href = "/dashboard"
}

export function navToMapNamed(mapName) {
    window.location.href = `/maps/${mapName}`
}