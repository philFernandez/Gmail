$(document).ready(function() {
    var clientId = '1032306829714-7d5q6lrv7b4ditg4pt43q8004f52prjk.apps.googleusercontent.com';
    var scopes =
        'https://www.googleapis.com/auth/gmail.readonly ' +
        'https://www.googleapis.com/auth/gmail.send';

        //left out handleClientLoad() apiKey

        function checkAuth() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: true
            }, handleAuthResult);
        }

        function handleAuthClick() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false
            }, handleAuthResult);
            return false;
        }

        function handleAuthResult(authResult) {
            if(authResult && !authResult.error) {
                loadGmailApi();
                $('#authorize-button').remove();
                $('.table-inbox').removeClass('hidden');
                $('#compose-button').removeClass('hidden');                
            } else {
                $('#authorize-button').removeClass('hidden');
                $('#authorize-button').on('click', function() {
                    handleAuthClick();
                });
            }
        }

        function loadGmailApi() {
            gapi.client.load('gmail', 'v1', displayInbox);
        }

        function displayInbox() {
            var request = gapi.client.gmail.users.message
        }

});







