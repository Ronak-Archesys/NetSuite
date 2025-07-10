/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(['N/log', 'N/search'], function (log, search) {

    function getInputData() {
        // Return a search, array, or object for map stage
        log.debug('getInputData', 'Fetching input data');        
        // Example: Returning a saved search
        return search.create({
            type: search.Type.SALES_ORDER,
            filters: [['status', 'anyof', 'SalesOrd:A']],
            columns: ['internalid', 'tranid']
        });
    }

    function map(context) {
        // Processes each item from getInputData
        var record = JSON.parse(context.value);
        log.debug('map stage', record);

        // Pass data to reduce stage
        context.write({
            key: record.id,
            value: record.values.tranid
        });
    }

    function reduce(context) {
        // Consolidates and processes data
        log.debug('reduce key', context.key);
        log.debug('reduce values', context.values);

        // Example logic: summarize or update records here
    }

    function summarize(summary) {
        // Final stage - summarization, logging, error handling
        log.audit('summarize stage', 'Map/Reduce completed');

        summary.inputSummary.errors.iterator().each(function (key, error) {
            log.error('Input Error: ' + key, error.message);
            return true;
        });

        summary.mapSummary.errors.iterator().each(function (key, error) {
            log.error('Map Error: ' + key, error.message);
            return true;
        });

        summary.reduceSummary.errors.iterator().each(function (key, error) {
            log.error('Reduce Error: ' + key, error.message);
            return true;
        });
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    };
});
