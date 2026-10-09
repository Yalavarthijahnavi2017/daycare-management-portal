"""Daycare Management Portal API.

Flask + MongoDB backend for the ISU Early Childhood Education Center:
children roster, program enrollments, and weekly schedules.
"""
from datetime import datetime

from bson import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

db = MongoClient("mongodb://localhost:27017/").daycare


def _doc_to_json(doc):
    doc = dict(doc)
    doc["_id"] = str(doc["_id"])
    return doc


# ---------------------------------------------------------------- children
@app.route("/api/children", methods=["GET"])
def list_children():
    return jsonify([_doc_to_json(d) for d in db.children.find()])


@app.route("/api/children", methods=["POST"])
def add_child():
    data = request.get_json(force=True)
    child = {
        "name": data.get("name"),
        "age": data.get("age"),
        "guardian": data.get("guardian"),
        "phone": data.get("phone"),
        "created_at": datetime.utcnow(),
    }
    result = db.children.insert_one(child)
    return jsonify({"_id": str(result.inserted_id)}), 201


# ---------------------------------------------------------------- enrollments
@app.route("/api/enrollments", methods=["GET"])
def list_enrollments():
    return jsonify([_doc_to_json(d) for d in db.enrollments.find()])


@app.route("/api/enrollments", methods=["POST"])
def add_enrollment():
    data = request.get_json(force=True)
    enrollment = {
        "child_id": data.get("child_id"),
        "program": data.get("program"),  # infant | toddler | preschool
        "status": data.get("status", "active"),
        "enrolled_at": datetime.utcnow(),
    }
    result = db.enrollments.insert_one(enrollment)
    return jsonify({"_id": str(result.inserted_id)}), 201


# ---------------------------------------------------------------- schedule
@app.route("/api/schedule", methods=["GET"])
def list_schedule():
    program = request.args.get("program")
    query = {"program": program} if program else {}
    return jsonify([_doc_to_json(d) for d in db.schedule.find(query)])


@app.route("/api/schedule", methods=["POST"])
def add_schedule_item():
    data = request.get_json(force=True)
    item = {
        "program": data.get("program"),
        "day": data.get("day"),
        "time": data.get("time"),
        "activity": data.get("activity"),
    }
    result = db.schedule.insert_one(item)
    return jsonify({"_id": str(result.inserted_id)}), 201


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
