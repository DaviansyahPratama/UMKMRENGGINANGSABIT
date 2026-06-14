<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

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
            $file = $request->file('image');
            
            // Buat nama file unik berdasarkan waktu biar gak bentrok
            $filename = time() . '_' . $file->getClientOriginalName();
            
            // Pindahkan file langsung ke folder public/images/products yang sifatnya permanen
            $file->move(public_path('images/products'), $filename);
            
            // Jalur ringkas ini yang kita simpan ke database
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
            $file = $request->file('image');

            // Hapus gambar lama dari folder public (jika filenya ada)
            if ($product->image_url && file_exists(public_path($product->image_url))) {
                @unlink(public_path($product->image_url));
            }

            // Simpan gambar baru ke folder public/images/products
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $filename);
            
            $data['image_url'] = 'images/products/' . $filename;
        }

        $product->update($data);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        // Hapus file gambar asli dari folder public saat produk dihapus
        if ($product->image_url && file_exists(public_path($product->image_url))) {
            @unlink(public_path($product->image_url));
        }

        $product->delete();

        return response()->json([
            'message' => 'Produk berhasil dihapus'
        ]);
    }
}