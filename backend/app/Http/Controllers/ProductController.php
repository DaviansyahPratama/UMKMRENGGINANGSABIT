<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // Modifikasi data yang keluar agar image_url ditambahkan domain backend otomatis
        $products = Product::latest()->get()->map(function ($product) {
            if ($product->image_url) {
                $product->image_url = asset($product->image_url);
            }
            return $product;
        });

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'composition' => 'required|string',
            'price' => 'required|numeric|min:1',
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $filename);
            
            // Tetap simpan jalur ringkas ke database agar rapi
            $imagePath = 'images/products/' . $filename;
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'composition' => $request->composition,
            'price' => $request->price,
            'category' => $request->category,
            'image_url' => $imagePath,
            'is_best_seller' => $request->is_best_seller ?? false,
        ]);

        // Ubah output respons agar langsung mengirimkan URL penuh ke frontend setelah sukses bikin produk
        if ($product->image_url) {
            $product->image_url = asset($product->image_url);
        }

        return response()->json($product);
    }

    public function show(Product $product)
    {
        // Ubah output respons single product agar berdomain penuh
        if ($product->image_url) {
            $product->image_url = asset($product->image_url);
        }

        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'composition' => 'required|string',
            'price' => 'required|numeric|min:1',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'composition' => $request->composition,
            'price' => $request->price,
            'category' => $request->category,
            'is_best_seller' => $request->is_best_seller ?? false,
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            // Hapus gambar lama menggunakan path asli database
            if ($product->image_url && file_exists(public_path($product->image_url))) {
                @unlink(public_path($product->image_url));
            }

            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $filename);
            
            $data['image_url'] = 'images/products/' . $filename;
        }

        $product->update($data);

        // Ubah output respons setelah update berhasil
        if ($product->image_url) {
            $product->image_url = asset($product->image_url);
        }

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        if ($product->image_url && file_exists(public_path($product->image_url))) {
            @unlink(public_path($product->image_url));
        }

        $product->delete();

        return response()->json([
            'message' => 'Produk berhasil dihapus'
        ]);
    }
}