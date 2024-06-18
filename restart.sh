#!/bin/bash

# Vòng lặp chạy trong 10 phút, mỗi lần nghỉ 5 giây
for ((i=0; i<60; i++))
do
    echo "Restarting dynos..."
    # Chạy lệnh để khởi động ứng dụng
    npm start  # Thay npm start bằng lệnh cần thiết để khởi động ứng dụng của bạn

    # Đợi 5 giây
    sleep 5

    # Thực hiện lệnh heroku ps:restart
    heroku ps:restart --app tritechzai
done
