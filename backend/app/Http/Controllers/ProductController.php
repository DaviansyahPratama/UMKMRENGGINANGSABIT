<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(
            Product::latest()->get()
        );
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
            $imagePath = $request->file('image')
                ->store('products', 'public');
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

        return response()->json($product);
    }

    public function show(Product $product)
    {
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

            // hapus gambar lama
            if ($product->image_url) {
                Storage::disk('public')->delete($product->image_url);
            }

            $data['image_url'] = $request
                ->file('image')
                ->store('products', 'public');
        }

        $product->update($data);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        if ($product->image_url) {
            Storage::disk('public')->delete($product->image_url);
        }

        $product->delete();

        return response()->json([
            'message' => 'Produk berhasil dihapus'
        ]);
    }
}
