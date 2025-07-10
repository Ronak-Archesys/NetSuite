/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define([], function () {

    function beforeLoad(context) {
        // Triggered before the record is loaded (UI or API)
    }

    function beforeSubmit(context) {
        // Triggered before the record is submitted to the database
    }

    function afterSubmit(context) {
        // Triggered after the record has been submitted to the database
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
});
