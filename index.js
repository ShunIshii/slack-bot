module.exports = function (context, req) {
    var body_type = req.body.type;
    const request = require('request');

    if(body_type == 'url_verification'){ // Slack の Event Subscription URL 検証用
        var body_challenge = req.body.challenge;
        context.res = {
            body: body_challenge
        };
    } else if(body_type == 'event_callback'){ // 通常のイベントの処理
        var event = req.body.event;

        if(event.type == 'file_shared'){ // 画像が送信されたときの処理
            context.log('User ID: %s', event.user_id);
            context.log('File ID: %s', event.file_id);

            var header = {
                "Content-Type": "application/json",
                "Authorization": "Bearer xoxp-1369928543665-1363490825172-2639214031189-7fbe1d382055b838c41409c35e9ea1c6" // [files:write] の権限も持った User OAuth Token
            }
            var options = {
                url: 'https://slack.com/api/files.sharedPublicURL', // 公開 URL を取得する API
                method: 'POST',
                headers: header,
                json: {
                    'file': event.file_id // イベントで受け取った file_id を渡す
                }
            }

            request(options, function (error, response, body) {
                var reply_text;
                if (body.ok) {
                    var public_url = body.file.permalink_public // 公開 URL
                    reply_text = "URL: " + public_url;
                }
                else {
                    var error_message = body.error;;
                    reply_text = "ERROR: " + error_message;
                }

                var reply_options = {
                    url: 'https://hooks.slack.com/services/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', // 投稿用の Webhook URL
                    form: 'payload={"text": "' + reply_text + '"}',
                    json: true
                };
                request.post(reply_options); // 公開 URL 又はエラーメッセージを投稿
            });
        }
        context.res = {
            body: "Success."
        };
    } else {
        context.res = {
            status: 400,
            body: "Bad Request. Please check your request parameters."
        };
    }
    context.done();
};
