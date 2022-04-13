<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($x = 0; $x <= 10; $x++) {
            DB::table('lion_results')->insert([
                'starting_pos' => Str::random(10),
                'result' => Str::random(10) . '@gmail.com',
                'password' => Hash::make('password'),
            ]);
        }
    }
}
