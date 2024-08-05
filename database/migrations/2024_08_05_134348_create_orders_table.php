<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->datetime ('rental_start_date');
            $table->datetime ('rental_end_date');
            $table->integer('number_of_rent_days');
            $table->decimal('total', 8, 2);
            $table->boolean('isActive')->default(true); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
