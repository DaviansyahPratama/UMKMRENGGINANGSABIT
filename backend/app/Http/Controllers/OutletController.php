<?php

namespace App\Http\Controllers;

use App\Models\Outlet;
use Illuminate\Http\Request;

class OutletController extends Controller
{
    public function index()
    {
        return response()->json(
            Outlet::latest()->get()
        );
    }

    public function store(Request $request)
    {
        try {

            $request->validate([
                'name' => 'required',
                'address' => 'required',
                'google_maps_url' => 'required',
            ]);

            $outlet = Outlet::create([
                'name' => $request->name,
                'address' => $request->address,
                'google_maps_url' => $request->google_maps_url,
            ]);

            return response()->json($outlet);
        } catch (\Exception $e) {

            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function show(Outlet $outlet)
    {
        return response()->json($outlet);
    }

    public function update(Request $request, Outlet $outlet)
    {
        $outlet->update([
            'name' => $request->name,
            'address' => $request->address,
            'google_maps_url' => $request->google_maps_url,
        ]);

        return response()->json($outlet);
    }

    public function destroy(Outlet $outlet)
    {
        $outlet->delete();

        return response()->json([
            'message' => 'Outlet berhasil dihapus'
        ]);
    }
}
