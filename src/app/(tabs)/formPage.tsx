// mengimpor library unutk menyimpan data secara lokal HP/browser semacam local database sederhana berbasis key-value
import AsyncStorage from "@react-native-async-storage/async-storage";

// mengimpor komponen stack dari Expo Router, dipakai untuk mengatur header halaman (judul, warna, dll) — ini konsep "Stack Navigator"
import { Stack } from "expo-router";

// React      = dibutuhkan supaya file bisa memakai JSX
// useEffect  = hook untuk menyimpan state, data yang bisa berubah dan bikin komponen re-render
// useState   = hook untuk menjalankan efek samping (side effect), misalnya ambil data saat halaman pertama kali dibuka.
import React, { useEffect, useState } from "react";

// FlatList           = untuk menampilkan list/daftar data secara efisien
// Text               = untuk menampilkan teks
// TextInput          = untuk kolom input
// TouchableOpacity   = tombol yang bisa ditekan (dengan efek transparan saat ditekan)
// View               = container/wadah (mirip <div> di HTML)
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

// mengimpor kumpulan style yang sudah di buat file terpisah.
import { styles } from '../../../style/style';

// ini semacam definisi data
// id         = identitas unik (string)
// name       = nama activity
// subTask    = array/daftar dari SubTask (sub-item di dalam activity itu)
// id         = identitas unik
// text       = isi teks sub-task
// completed  = status selesai atau belum (true/false)
type Activity = 
  {
    id: string;
    name: string;
    subTask: SubTask[];
  };
type SubTask =
  {
    id: string;
    text: string;
    completed: boolean;
  }

// Ini adalah nama key yang dipakai untuk menyimpan/mengambil data dari AsyncStorage. Dibuat konstanta supaya tidak perlu ketik ulang string yang sama berkali-kali (dan menghindari typo).
const STORAGE_KEY = "@activities_data";

export default function FormPage() 
{
    // name     = menyimpan teks yang diketik user di kolom nama activity. 
    // setName  = fungsi untuk mengubah nilainya
    const [name, setName] = useState("");

    // Sama seperti di atas, tapi untuk kolom deskripsi.
    const [description, setDescription] = useState("");

    // activities = array yang menyimpan semua activity. Diberi tipe <Activity[]> supaya TypeScript tahu isinya harus sesuai struktur Activity. Nilai awalnya array kosong []. 
    const [activities, setActivities] = useState<Activity[]>([]);

    // Penanda apakah data dari AsyncStorage sudah selesai dimuat atau belum. Ini penting supaya kita tidak menyimpan data kosong ke storage sebelum data asli selesai dibaca.
    const [isLoaded, setIsLoaded] = useState(false);

  // async = fungsi ini butuh waktu (asynchronous), karena mengambil data dari storage tidak instan.
    // AsyncStorage.getItem(STORAGE_KEY) = ambil data mentah (berupa string JSON) berdasarkan key yang sudah ditentukan.
    // JSON.parse(jsonValue) = ubah string JSON tadi jadi array/object JavaScript asli, lalu simpan ke state activities.
    // try...catch = kalau proses gagal (misal data korup), akan masuk ke catch supaya app tidak crash, cukup tampilkan error di console.
    // finally = selalu dijalankan, baik berhasil atau gagal — dipakai untuk menandai isLoaded = true, supaya proses simpan (poin 6) bisa mulai berjalan.
    // [] (array kosong) di akhir berarti: jalankan sekali saja, waktu komponen pertama kali muncul di layar. Di sini dipakai untuk memanggil loadActivities() — mengambil data lama yang tersimpan.
    useEffect(() => {
      const loadActivities = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
          if (jsonValue != null) {
              setActivities(JSON.parse(jsonValue));
          }
        } 
        catch (e) 
        {
          console.error("Failed to load activities", e);
        } 
        finally 
        {
          setIsLoaded(true);
        }
      };

      loadActivities();
    }, []);

      // [activities, isLoaded] berarti: jalankan ulang setiap kali activities atau isLoaded berubah.Kenapa ada pengecekan if (isLoaded) Supaya proses simpan data tidak berjalan sebelum data lama selesai dimuat — kalau tidak dicek, saat halaman pertama dibuka, activities masih [] (kosong) dan bisa menimpa/menghapus data lama yang sebenarnya sudah ada di storage.
      useEffect(() => {
        const saveActivities = async (data: Activity[]) => {
          try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
          } catch (e) {
            console.error("Failed to save activities", e);
          }
        };

        if (isLoaded) {
          saveActivities(activities);
        }
      }, [activities, isLoaded]);


    // .trim() = menghapus spasi di awal/akhir teks. Ini untuk mengecek apakah user benar-benar mengisi nama & deskripsi (bukan cuma spasi kosong).Kalau salah satu kosong → tampilkan alert, lalu return (hentikan fungsi, tidak lanjut ke bawah).
    const handleAddActivity = () => 
    {
      if (name.trim() === "" || description.trim() === "") 
      {
        alert("Please fill in both the name and description");
        return;
      }

      // Ini memecah teks deskripsi jadi beberapa sub-task, berdasarkan baris:
      // split("\n")   = pecah teks jadi array, setiap kali ketemu baris baru (enter).
      // map((line) => line.trim())     = hapus spasi berlebih di tiap baris.
      // filter((line) => line !== "")  = buang baris yang kosong (misal user pencet enter dua kali).
      const lines = description
        .split ("\n")
        .map ((line) => line.trim())
        .filter ((line) => line !== "");
      
      // Ubah tiap baris teks tadi jadi object SubTask:
      // id → gabungan timestamp saat ini (Date.now()) + index baris, supaya id-nya unik (tidak ada 2 sub-task dengan id sama).
      // text → isi baris teksnya.
      // completed: false → semua sub-task baru otomatis belum selesai.
      const newSubTask: SubTask[] = lines.map((line, index) => ({
        id: `${Date.now()}-${index}`,
        text: line,
        completed: false,
      }));
        
      // Membuat 1 object Activity baru, berisi id unik, nama (sudah di-trim), dan array sub-task yang barusan dibuat.
      const newActivity: Activity = 
      {
        id: Date.now().toString(),
        name: name.trim(),
        subTask: newSubTask
      };

      // Menambahkan activity baru ke dalam state activities.(prev) => [...prev, newActivity] = ambil data lama (prev), sebar isinya (...prev), lalu tambahkan newActivity di akhir array. Ini pola standar untuk update state berdasarkan array tanpa menghapus data lama.
      setActivities((prev) => [...prev, newActivity]);
      // Mengosongkan kembali input nama & deskripsi setelah activity berhasil ditambahkan (reset form).
      setName("");
      setDescription("");
    };

    // .filter((item) => item.id !== id) = buat array baru yang isinya semua activity KECUALI yang id-nya cocok dengan yang mau dihapus. Jadi activity dengan id tersebut otomatis "hilang" dari array.
    const handleDelete = (id: string) => 
    {
      setActivities((prev) => prev.filter((item) => item.id !== id));
    };

    // .map() → looping semua activity, tapi hasilnya array baru (bukan diubah langsung).Kalau activity.id tidak sama dengan activityId yang dituju → kembalikan activity itu apa adanya (tidak diubah).
    const toggleSubTaskCompleted = (activityId: string, subTaskId: string) => {
      setActivities((prev) =>
        prev.map((activity) => {
          if (activity.id !== activityId) return activity;

          // Kalau activity-nya cocok, masuk ke sini:
          // Looping semua subTask di dalam activity itu.
          // Kalau sub.id cocok dengan subTaskId yang ditekan = buat object baru dengan completed dibalik (!sub.completed, dari true jadi false atau sebaliknya).
          // Kalau tidak cocok = biarkan sub-task itu apa adanya.
          // Terakhir, kembalikan activity dengan subTask yang sudah diperbarui.
          const updateSubTask = activity.subTask.map((sub) =>
            sub.id === subTaskId ? { ...sub, completed: !sub.completed} : sub
          );
          return {...activity, subTask: updateSubTask}
        })
      );
    };

    // activity.subTask.length > 0 = pastikan activity punya minimal 1 sub-task (kalau kosong, jangan dianggap "selesai").
    // .every((sub) => sub.completed) = cek apakah SEMUA sub-task punya completed === true. Kalau ada 1 saja yang false, hasilnya false.
    // && = kedua syarat harus sama-sama benar baru hasil akhirnya true.
    const isActivityCompleted = (activity: Activity) => {
      return (
        Array.isArray(activity.subTask) &&
        activity.subTask.length > 0 &&
        activity.subTask.every((sub) => sub.completed)
      );
    };

    return (
    // View pembungkus utama seluruh halaman.
    <View style={styles.container}>

        {/* Mengatur header halaman ini secara spesifik (judul "Form Page", posisi judul di tengah, warna header, dll) — ini fitur dari Expo Router, tidak perlu bikin komponen header manual. */}
        <Stack.Screen
          options=
            {{
              title: "Form Page",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#a6d9e8" },
              headerTitleStyle: 
              {
                fontSize: 20,
                fontWeight: "600",
                color: "#1a1a1a",
              },
                headerShadowVisible: false,
            }}/>

      {/* Judul besar di halaman form. */}
      <Text style={styles.heading}>Activity Form</Text>

        {/* Input untuk nama activity:value={name} = nilai input ini "terikat" ke state name (controlled input).onChangeText={setName}  = setiap kali user mengetik, otomatis panggil setName untuk update state. */}
        <TextInput
          style={styles.input}
          placeholder="Enter activity name..."
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}/>

        {/* Input untuk deskripsi, mirip di atas, tapi
        multiline = bisa diketik lebih dari 1 baris.
        numberOfLines={5} = tinggi awal kira-kira 5 baris.
        textAlignVertical="top" = teks mulai dari atas (bukan tengah), supaya nyaman untuk multiline.
        style={[styles.input, styles.textArea]} = menggabungkan 2 style sekaligus (style umum input + style khusus textarea). */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter activity description..."
          placeholderTextColor="#777"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          textAlignVertical="top"/>

      {/* onPress={handleAddActivity} = saat ditekan, panggil fungsi handleAddActivity.
          activeOpacity={0.8} = efek transparan (20%) saat tombol ditekan, memberi feedback visual. */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddActivity}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>ADD ACTIVITY</Text>
      </TouchableOpacity>

        {/* Judul kecil sebelum daftar activity. */}
        <Text style={styles.listHeading}>Activity List</Text>

      {/* data={activities} = sumber data yang mau ditampilkan sebagai list.
          keyExtractor={(item) => item.id} = React butuh key unik untuk tiap item, di sini dipakai id.
          ListEmptyComponent = tampilan alternatif kalau activities kosong (belum ada data). */}
      <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          style={styles.list}
          ListEmptyComponent={<Text style={styles.emptyText}>No activities yet.</Text>}

          // renderItem = fungsi yang menentukan bagaimana setiap item ditampilkan. item di sini adalah 1 object Activity. allCompleted dihitung dulu di awal, supaya bisa dipakai untuk menentukan style judul.
          renderItem={({item}) => {
            const allCompleted = isActivityCompleted(item);
            return(

              // styles.cardTitle = selalu dipakai.
              // allCompleted && styles.completedText = hanya ditambahkan kalau allCompleted bernilai true (semua sub-task selesai). Kalau false, hasil && adalah false, dan React akan mengabaikan nilai false di dalam array style (tidak error).
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  {/* judul tugas otomatis tercoret jika seluruh aktivitas sudah rtercoret */}
                  <Text style={[styles.cardTitle, allCompleted && styles.completedText]}>
                    {item.name}
                  </Text>
                  
                  {/* Looping semua sub-task di activity ini, tiap sub-task dibungkus TouchableOpacity supaya bisa ditekan. Saat ditekan, panggil toggleSubTaskCompleted dengan item.id (activity mana) dan sub.id (sub-task mana). */}
                  {(item.subTask ?? []).map((sub) => (
                    <TouchableOpacity
                      key={sub.id}
                      style={styles.subTaskRow}
                      onPress={() => toggleSubTaskCompleted(item.id, sub.id)}
                    >

                      {/* Menampilkan ikon checkbox: kalau sub.completed true = tampil ✅, kalau false → tampil ◻️ (kotak kosong). Ini pakai ternary operator (kondisi ? nilaiJikaTrue : nilaiJikaFalse). */}
                      <Text style={styles.checkboxIcon}>
                        {sub.completed ? "✅" : "◻️"}
                      </Text>

                      {/* Menampilkan teks sub-task, dengan style coret (completedText) kalau sub-task itu sendiri sudah completed. */}
                      <Text style={[styles.cardDesc, sub.completed && styles.completedText]}>
                        {sub.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Tombol hapus activity (ikon "X"), memanggil handleDelete dengan id activity yang mau dihapus. /> di akhir menutup tag <FlatList>. */}
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          />
    </View>
  )
}