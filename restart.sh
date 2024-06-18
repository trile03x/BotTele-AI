for ((i=0; i<60; i++))
do
    echo "Restarting dynos..."
    web npm start
    heroku ps:restart --app <tên-ứng-dụng-của-bạn>
    sleep 5  # Thời gian nghỉ 5 giây giữa mỗi lần khởi động lại
done