<?php

namespace App\Http\Controllers;

use App\Models\productStore;
use App\Models\store;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class shopingController extends Controller
{


    public function createUser(Request $request)
    {   
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->save();
        return response()->json([
            'msg' => 'succsesful'
        ]);
    }

    public function signup()
    {
        return Inertia::render('Signup');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);


        if ($validator->fails()) {
            response()->json([
                'response_error' => $validator->messages(),
            ]);
        } else {

            $users = User::where('email', $request->email)->where('password', $request->password)->first();
            if ($users) {
                return response()->json([
                    'msg' => 'You Are Logged In',
                    'status' => 200,
                    'id_user' => $users->id
                ]);
            } else {
                return response()->json([
                    'msg' => 'pleas check your email and password',
                    'status' => 401
                ]);
            }
        }
    }



    public function allStore()
    {
        $store = store::all();
        return $store;
    }

    public function createStore()
    {
        return Inertia::render('Store');
    }


    public function delete_store($id)
    {
        $store = store::findOrFail($id);
        $store->delete();
        return response()->json([
            'msg' => 'succses delete'
        ]);
    }

    public function product()
    {
        return Inertia::render('Additem');
    }
    public function product_store()
    {
        return Inertia::render('ProductStore');
    }
    public function get_product_store($id)
    {
        $product_Store = productStore::where('store_id', $id)->get();
        return response()->json([
            'products' => $product_Store,
        ]);
    }

    public function add_Prodcut(Request $request)
    {

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalName();
            $path = $request->file('image')->move('public/images/', $filename);
            $product_Store = new productStore();
            $product_Store->image = $path;
            $product_Store->name = $request->name;
            $product_Store->desc = $request->desc;
            $product_Store->price = $request->price;
            $product_Store->location = $request->location;
            $product_Store->store_id = $request->idStore;
            $product_Store->save();
            return response()->json(['msg' => 'succseful']);
        } else {
            return response()->json(['msg' => 'fail']);
        }
    }


    public function update()
    {
        return Inertia::render('Update');
    }

    public function update_item($id)
    {
        $product_Store = productStore::where('id', $id)->get();
        return response()->json([
            'products' => $product_Store,
        ]);
    }

    public function update_product(Request $request, $id)
    {

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalName();
            $path = $request->file('image')->move('public/images/', $filename);
            $product_Store = productStore::findOrFail($id);
            $product_Store->image = $path;
            $product_Store->name = $request->name;
            $product_Store->desc = $request->desc;
            $product_Store->price = $request->price;
            $product_Store->location = $request->location;
            $product_Store->store_id = $request->idStore;
            $product_Store->save();
            return response()->json(['msg' => 'succseful']);
        } else {
            return 'fail';
        }
    }


    public function uploadImage(Request $request)
    {

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalName();
            $path = $request->file('image')->move('public/images/', $filename);
            $store = new store();
            $store->logo = $path;
            $store->user_id = $request->user_id;
            $store->storeName = $request->input('title');
            $store->save();
            return redirect()->route('/');
        } else {
            return 'Please choose Image or Name for your Store';
        }
    }
}
