<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductType;
use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;

use function GuzzleHttp\Promise\all;

class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //




        $proudcts_type = ProductType::withCount('activeProducts')->where('user_id', auth()->user()->id);

        $proudcts_type->when($request->name !== '', function ($q) use ($request) {
            return $q->where('name', 'like', '%' . $request->name . '%');
        });
        $proudcts_type->orderBy('id', 'desc');
        $proudcts_type =  $proudcts_type->paginate(10);



        return   $proudcts_type;
    }

    /**     
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductType $request)
    {

        // Store the uploaded image
        $image = $request->file('file');
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('images'), $imageName);

        $proudcts_type = new ProductType();
        $proudcts_type->name = $request->name;
        $proudcts_type->description = $request->description;

        $proudcts_type->image = 'images/' . $imageName;

        $proudcts_type->user_id = auth()->user()->id;

        $proudcts_type->save();



        return $proudcts_type;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductType  $productType
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $productType = ProductType::findOrFail($id);

        if ($productType->user_id !== auth()->user()->id) {
            return response()->json([
                'error' => 'You cant access to this resourse'
            ], 403);
        }


        $items = Product::where('product_type_id', $productType->id);
        $items->when($request->sn !== null, function ($q) use ($request) {
            return $q->where('serial_nb', '=', $request->sn);
        });
        $items = $items->paginate(10);
        return $items;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProductType  $productType
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductType $productType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductType  $productType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductType $productType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductType  $productType
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProductType $productType)
    {
        //
    }

    public function test()
    {
        # code...

        return asset('images/1677068446.png');
    }
}
