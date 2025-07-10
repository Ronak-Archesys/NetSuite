/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define([], function () {

    function pageInit(context) {
        // Triggere
    }

    function fieldChanged(context) {
        // Triggered when a field value is changed
    }

    function postSourcing(context) {
        // Triggered after a field is sourced (auto-populated)
    }

    function sublistChanged(context) {
        // Triggered when a sublist line is added, removed, or changed
    }

    function lineInit(context) {
        // Triggered when a line is selected in a sublist
    }

    function validateField(context) {
        // Triggered before a field value is changed
        return true; // return false to prevent the change
    }

    function validateLine(context) {
        // Triggered before a line is added or saved in a sublist
        return true; // return false to prevent saving the line
    }

    function validateInsert(context) {
        // Triggered before a line is inserted into a sublist
        return true;
    }

    function validateDelete(context) {
        // Triggered before a line is removed from a sublist
        return true;
    }

    function saveRecord(context) {
        // Triggered before the record is saved
        return true; // return false to prevent saving the record
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
});
