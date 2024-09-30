<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "6207400368:AAEnyR59oUJHvytqQiqdXp7cN2anrNROsjg";

//Сюда вставляем chat_id
$chat_id = "213244916";

// Проверяем, что пришел POST-запрос
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $site = $_POST['site'];
    $nameTariff = $_POST['nameTariff'];
    $cost = $_POST['cost'];
    $costBitrix = $_POST['costBitrix'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Заявка с сайта:' => $site,
        'Тариф:' => $nameTariff,
        'Цена решения:' => $cost,
        'Цена Битрикса:' => $costBitrix,
        'Имя:' => $name,
        'Телефон:' => $phone,
        'Почта:' => $email,
    );

    // Настраиваем внешний вид сообщения в телеграме
    foreach ($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    }

    // Передаем данные боту
    $sendToTelegram = file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}");

    // Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        echo 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.';
    }

    // А здесь сообщение об ошибке при отправке
    else {
        echo 'Что-то пошло не так. Попробуйте отправить форму ещё раз.';
    }
}
?>