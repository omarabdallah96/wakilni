<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'omar',
            'email' => 'omar@gmail.com',
            'password' => Hash::make('password')
        ]);
        \App\Models\User::factory(10)->create();

        for ($i = 1; $i < 100; $i++) {
            # code...

            ProductType::create([
                'name' => 'ProductType' . $i,
                'user_id' => rand(1, 3),
                'image'=>'images/default.png'


            ]);
        }
        for ($i = 1; $i < 100; $i++) {
            # code...

            Product::create([
                'product_name' => 'item' . $i,
                'product_type_id' => rand(1, 20),
                'serial_nb' => rand(1000, 10000) . $i,
                'sold' => rand(0, 1)


            ]);
        }
    }
}
