<?php
    $koneksi = new mysqli("localhost", "root", "", "gempa");

    if($koneksi -> connect_error){
        echo "koneksi gagal";
    }
?>