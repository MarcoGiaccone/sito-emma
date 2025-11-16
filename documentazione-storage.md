✅ 1. Caricare un'immagine su Supabase Storage
Step principale: usare .storage.from('bucket-name').upload()
```
async uploadImage(file: File): Promise<string> {
  const filePath = `${Date.now()}_${file.name}`;

  const { data, error } = await this.supabase.storage
    .from('project-covers')     // <-- nome del bucket
    .upload(filePath, file);

  if (error) throw error;

  return filePath; // poi servirà per ottenere la URL
}
```

✅ 2. Ottenere la URL pubblica

Se il tuo bucket è public, Supabase può generare direttamente la URL:

```const { data } = this.supabase.storage
  .from('project-covers')
  .getPublicUrl(filePath);

const publicUrl = data.publicUrl;
```

🟦 Esempio completo (upload + URL)
```
async uploadImageAndGetUrl(file: File): Promise<string> {
  const filePath = `${Date.now()}_${file.name}`;

  // 1. Upload
  const { error: uploadError } = await this.supabase.storage
    .from('project-covers')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // 2. Get URL
  const { data } = this.supabase.storage
    .from('project-covers')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
```

📌 Opzione avanzata: URL firmata (expiring link)

Se il bucket non è pubblico, puoi generare una URL temporanea:
```
const { data, error } = await this.supabase.storage
  .from('project-covers')
  .createSignedUrl(filePath, 60 * 60); // 1 ora

const secureUrl = data.signedUrl;
```
📂 Come creare un bucket sul sito Supabase

Supabase Dashboard

Storage → Create Bucket

Dai un nome (es: project-covers)

Scegli Public se vuoi URL pubbliche

⭐ In sintesi
Obiettivo	Metodo
Upload immagine	.storage.from(bucket).upload(path, file)
URL pubblica	.getPublicUrl(path)
URL temporanea	.createSignedUrl(path, expiresInSeconds)