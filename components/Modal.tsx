// The forms for add and edit pages for types and sessions.

import React from "react";

export async function addSession() { 
    
    return (
        <form method="POST" action="/api/sessions">
            <div>
                <label>Type ID</label>
                <input type="number" name="type_id" />
            </div>

            <div>
                <label>Title</label>
                <input type="text" name="title" required />
            </div>

            <div>
                <label>Scheduled Date</label>
                <input type="datetime-local" name="scheduled_date" required />
            </div>

            <div>
                <label>Status</label>
                <select name="status" required>
                    <option value="Active">Active</option>
                    <option value="Retired">Retired</option>
                </select>
            </div>

            <div>
                <label>Notes</label>
                <textarea name="notes"></textarea>
            </div>

            <button type="submit">Save Session</button>
        </form>
    )
    // userId, typeId, title, scheduledDate, notes
}

export async function editSession() {
    return (
        <form method="PUT" action="/api/sessions/[id]">
            <div>
                <label>Type ID</label>
                <input type="number" name="type_id" />
            </div>

            <div>
                <label>Title</label>
                <input type="text" name="title" required />
            </div>

            <div>
                <label>Scheduled Date</label>
                <input type="datetime-local" name="scheduled_date" required />
            </div>

            <div>
                <label>Status</label>
                <select name="status" required>
                    <option value="Active">Active</option>
                    <option value="Retired">Retired</option>
                </select>
            </div>

            <div>
                <label>Notes</label>
                <textarea name="notes"></textarea>
            </div>

            <button type="submit">Update Session</button>
        </form>
    )
    // userId, typeId, title, scheduledDate, notes
}

export async function addType() {
    return (
        <form method="POST" action="/api/type">

        </form>
    )
    // userId, name, notes, status
}

export async function editType() {
    return (
        <form method="PUT" action="/api/type/[id]">

        </form>
    )
    // userId, name, notes, status
}