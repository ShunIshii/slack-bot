# slack-bot
投稿されたファイルの公開用リンクを返すボット用

## 作り方

### 1. Slack アプリの作成

1. [slack api](https://api.slack.com/) へアクセスし、[Create an app] からアプリを作成する
2. [From scratch] を選択

![image](https://user-images.githubusercontent.com/39784917/139400699-86d997fd-57f1-4c3d-ab3a-99817cdb0855.png)

3. MS Student Community のアカウントでサインインし、各項目を入力

![image](https://user-images.githubusercontent.com/39784917/139400783-d97bce82-67ac-4819-bf70-1a6c2da43e52.png)

4. Azure Functions から Slack に投稿できるように、Incoming Webhooks を ON にする

![image](https://user-images.githubusercontent.com/39784917/139400812-ea9e7710-e953-4eb9-bc42-25293be900d2.png)

5. Incoming Webhooks を選んだまま下の方へスクロールし、[Add New Webhook to Workspace] をクリック

![image](https://user-images.githubusercontent.com/39784917/139400595-e0ecd66a-27b9-4ecb-9a7b-8692ba7bb399.png)

6. 投稿するチャンネルを選び、[Allow]

![image](https://user-images.githubusercontent.com/39784917/139401173-3ad9e35f-3a79-4233-a427-955f1a05a539.png)

7. 画像が投稿されたら Azure Functions が呼ばれるように、[Event Subscriptions] を ON にする

![image](https://user-images.githubusercontent.com/39784917/139401794-4652a5a5-26e9-4aea-aa50-e2bb09b421b1.png)

8. このリポジトリの [index.js] で Functions を作成（雑ですみません）
9. 作成された関数の URL を 7 の [Request URL] へ貼り付け

![image](https://user-images.githubusercontent.com/39784917/139402372-78af7daa-d0da-4a48-884c-c9586a8f5e8d.png)

10. そのまま [Subscribe to bot events で [file_shared] を追加し保存

![image](https://user-images.githubusercontent.com/39784917/139402705-3c8fb26a-a70c-4567-9b30-8d2399ea213d.png)

11. [OAuth & Permissions] を選択

![image](https://user-images.githubusercontent.com/39784917/139401550-9eecf111-ae5a-4ca9-9542-9b5b917e408c.png)

12. [User Token Scopes] にて [files:write] を追加し再インストール

![image](https://user-images.githubusercontent.com/39784917/139402966-1f4e16ad-18d4-432d-bbe8-fa60ae1dfbd7.png)

13. Azure Functions の19行目と42行目を Slack アプリに合わせて変更
