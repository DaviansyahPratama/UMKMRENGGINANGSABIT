<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // <-- 1. Pastikan baris ini ada

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 2. Tambahkan kode ini untuk memaksa semua URL menggunakan HTTPS di server live
        if (config('app.env') === 'production' || isset($_SERVER['HTTPS'])) {
            URL::forceScheme('https');
        }
    }
}