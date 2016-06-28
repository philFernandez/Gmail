$(document).ready(function() {
    var clientId = '1032306829714-7d5q6lrv7b4ditg4pt43q8004f52prjk.apps.googleusercontent.com';
    var scopes =
        ['https://www.googleapis.com/auth/gmail.readonly ' +
        'https://www.googleapis.com/auth/gmail.send'];

        

        function checkAuth() {
            gapi.auth.authorize(
            {
                client_id: clientId,
                scope: scopes.join(' '),
                immediate: true
            }, handleAuthResult);
        }



        function handleAuthResult(authResult) {
            var authorizeDiv = document.getElementById('authorize-div');
            if (authResult && !authResult.error) {
                authorizeDiv.style.display = 'none';
                loadGmailApi();
            }
            else {
                authorizeDiv.style.display = 'inline';
            }          
        }

        function handleAuthClick(event) {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: false
            }, handleAuthResult);
            return false;
        }

        function loadGmailApi() {
            gapi.client.load('gmail', 'v1', displayInbox);
        }

        function displayInbox() {
            var request = gapi.client.gmail.users.messages.list({
                'userId': 'me',
                'labelIds' : 'INBOX',
                'maxResults' : 10
            });
            request.execute(function(resp) {
                $.each(resp.messages, function() {
                    var messageRequest = gapi.client.gmail.users.messages.get({
                        'userId': 'me',
                        'id': this.id
                    });
                    messageRequest.execute(appendMessageRow);
                });
            });
        }

        function appendMessageRow(message) {
            $('#mail').append(message.id);
        }
                      
        

});







