/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/log'], function (log) {

    function doGet(params) {
        log.debug('GET Request Received', params);
        return { status: 'success', method: 'GET', data: params };
    }

    function doPost(data) {
        log.debug('POST Request Received', data);
        return { status: 'success', method: 'POST', data: data };
    }

    function doPut(data) {
        log.debug('PUT Request Received', data);
        return { status: 'success', method: 'PUT', data: data };
    }

    function doDelete(params) {
        log.debug('DELETE Request Received', params);
        return { status: 'success', method: 'DELETE', data: params };
    }

    return {
        get: doGet,
        post: doPost,
        put: doPut,
        delete: doDelete
    };
});
