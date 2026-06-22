# Core Development Plan - Web Mua Ban Tai Khoan

## 1. Muc tieu du an

Xay dung mot website mua ban tai khoan don gian, co the trien khai nhanh trong 5-7 ngay, dung dung pham vi bao gia:

- Homepage
- Trang danh sach san pham
- Trang chi tiet san pham
- Trang quan tri:
- Them san pham
- Chinh sua san pham
- Xoa san pham
- Quan ly hinh anh san pham

Chi phi phat trien tham chieu: `2.500.000 VNĐ`

Tai lieu nay duoc dinh huong dua tren repo tham khao `WhiteSpace`, trong do stack phu hop nhat de tai su dung cho du an nay la:

- `Next.js 15` + `React 19`
- `App Router`
- `Prisma`
- `PostgreSQL`
- `Cloudinary` de luu anh
- Deploy len `Vercel`

## 2. Dinh huong san pham

Website nay khong can phat trien nhu mot san thuong mai dien tu day du co gio hang, thanh toan online, van chuyen, ton kho phuc tap. Trong pham vi bao gia hien tai, day la mo hinh:

- Website gioi thieu va dang ban san pham
- Admin tu dang san pham
- Khach xem danh sach san pham va thong tin chi tiet
- Khach lien he qua Zalo, Telegram, Facebook, hotline, hoac nut "Mua ngay" dan den kenh chat

Noi dung "tai khoan" o day co the la:

- Tai khoan game
- Tai khoan streaming
- Tai khoan hoc tap
- Tai khoan phan mem
- Tai khoan mang xa hoi
- Tai khoan ads / BM / tool

Can thong nhat ro ngay tu dau:

- Website la nen tang dang tin va chot don thu cong
- Khong tu dong giao account trong phase 1
- Khong tich hop thanh toan online trong phase 1

## 3. Kien truc de xuat

De xuat su dung kien truc gon, on dinh, de deploy:

### Phuong an khuyen nghi

- `Frontend`: Next.js deploy len Vercel
- `Backend`: dung API route ngay trong Next.js cho phase 1
- `Database`: PostgreSQL
- `ORM`: Prisma
- `Image storage`: Cloudinary
- `Auth admin`: login 1 tai khoan admin bang session/cookie don gian

### Ly do chon phuong an nay

- Giu stack don gian, de hoan thanh trong 5-7 ngay
- Giam chi phi van hanh
- De ban giao source
- De deploy
- De nang cap ve sau

### Phuong an tham khao tu WhiteSpace

Repo `WhiteSpace` dang theo huong:

- Frontend Next.js
- Backend tach rieng
- Prisma + PostgreSQL
- Cloudinary upload anh
- Vercel cho frontend/backend

Voi du an mua ban tai khoan nho gon, khong can tach 2 project ngay tu dau. Nen uu tien:

- Mot repo Next.js duy nhat
- API route trong `app/api/*`
- Sau nay neu lon hon moi tach backend rieng

## 4. Cong nghe chot cho phase 1

### Bat buoc

- `Next.js 15`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Prisma`
- `PostgreSQL`
- `Cloudinary`
- `Vercel`

### Goi y thu vien bo sung

- `zod` de validate du lieu form
- `react-hook-form` cho form admin
- `bcryptjs` neu can ma hoa password admin
- `jose` hoac session cookie tu viet nhe cho admin auth
- `slugify` hoac helper tu viet de tao slug

## 5. Cau truc tinh nang theo bao gia

## 5.1 Homepage

Muc tieu:

- Tao cam giac uy tin
- Danh nhanh vao nhu cau mua tai khoan
- Dieu huong nguoi dung den danh sach san pham va lien he

Section de xuat:

- Hero banner
- Danh muc noi bat
- San pham moi dang
- San pham noi bat
- Quy trinh giao dich
- Cam ket / ly do chon shop
- FAQ ngan
- Footer lien he

Noi dung CTA:

- "Xem tai khoan dang ban"
- "Mua ngay"
- "Lien he Zalo"

## 5.2 Trang danh sach san pham

Muc tieu:

- Cho nguoi dung xem nhanh toan bo tai khoan dang ban
- Loc nhanh theo nhu cau

Tinh nang can co:

- Hien thi grid san pham
- Anh dai dien
- Ten san pham
- Gia
- Tinh trang
- Danh muc
- Nut xem chi tiet

Filter phase 1:

- Theo danh muc
- Theo muc gia
- Theo trang thai

Trang thai de xuat:

- `con-hang`
- `da-ban`
- `tam-an`

## 5.3 Trang chi tiet san pham

Muc tieu:

- Hien thi du thong tin de khach quyet dinh
- Day khach sang kenh chat de chot don

Noi dung can co:

- Ten san pham
- Gallery anh
- Gia
- Ma san pham
- Danh muc
- Mo ta chi tiet
- Thuoc tinh tai khoan
- Tinh trang
- Ngay dang
- Nut lien he mua ngay

Thuoc tinh tai khoan tuy theo loai co the gom:

- Loai tai khoan
- Nguon goc
- Da doi mail chua
- Bao hanh bao lau
- Co thong tin dang nhap gi di kem
- Rank / level / so du / so nam su dung
- Ghi chu an thong tin nhay cam

## 5.4 Trang quan tri

Can co dang nhap admin don gian:

- `/admin/login`
- `/admin/dashboard`
- `/admin/products`

Chuc nang:

- Tao san pham
- Sua san pham
- Xoa san pham
- Upload 1 hoac nhieu anh
- Chon anh dai dien
- Cap nhat trang thai

## 6. Mo hinh du lieu de xuat

Day la schema toi gian, phu hop pham vi hien tai.

### Bang `Product`

- `id`
- `title`
- `slug`
- `sku`
- `category`
- `price`
- `originalPrice` (optional)
- `status`
- `shortDescription`
- `description`
- `thumbnailUrl`
- `thumbnailPublicId`
- `isFeatured`
- `contactLink`
- `createdAt`
- `updatedAt`

### Bang `ProductImage`

- `id`
- `productId`
- `imageUrl`
- `publicId`
- `sortOrder`
- `createdAt`

### Bang `ProductAttribute`

- `id`
- `productId`
- `label`
- `value`
- `sortOrder`

### Bang `AdminUser`

- `id`
- `username`
- `passwordHash`
- `createdAt`
- `updatedAt`

## 7. Prisma schema dinh huong

Co the phac thao nhu sau:

```prisma
model AdminUser {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Product {
  id               String             @id @default(cuid())
  title            String
  slug             String             @unique
  sku              String?            @unique
  category         String
  price            Decimal            @db.Decimal(12, 2)
  originalPrice    Decimal?           @db.Decimal(12, 2)
  status           ProductStatus      @default(ACTIVE)
  shortDescription String?
  description      String
  thumbnailUrl     String
  thumbnailPublicId String?
  isFeatured       Boolean            @default(false)
  contactLink      String?
  images           ProductImage[]
  attributes       ProductAttribute[]
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt

  @@index([category, status])
}

model ProductImage {
  id        String   @id @default(cuid())
  productId String
  imageUrl  String
  publicId  String?
  sortOrder Int      @default(0)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@index([productId, sortOrder])
}

model ProductAttribute {
  id        String   @id @default(cuid())
  productId String
  label     String
  value     String
  sortOrder Int      @default(0)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId, sortOrder])
}

enum ProductStatus {
  ACTIVE
  SOLD
  HIDDEN
}
```

## 8. Cau truc folder de xuat

```txt
src/
  app/
    (public)/
      page.tsx
      san-pham/
        page.tsx
        [slug]/
          page.tsx
    admin/
      login/
        page.tsx
      dashboard/
        page.tsx
      products/
        page.tsx
        new/
          page.tsx
        [id]/
          page.tsx
    api/
      admin/
        login/route.ts
        logout/route.ts
        products/route.ts
        products/[id]/route.ts
        media/upload/route.ts
  components/
    admin/
    shared/
    product/
  lib/
    auth.ts
    prisma.ts
    cloudinary.ts
    slug.ts
    utils.ts
  types/
```

Neu muon giong cach to chuc cua `WhiteSpace`, co the giu:

- `app/`
- `components/admin`
- `components/shared`
- `lib/`

Day la huong nen bam theo vi de mo rong.

## 9. Chien luoc upload anh

Theo bai hoc tu `WhiteSpace`:

- Khong luu file local neu deploy Vercel production
- Anh phai dua len dich vu cloud

### Chon Cloudinary

Ly do:

- De setup
- Co URL CDN san
- Tich hop tot voi Next Image
- Phu hop website nho

### Quy trinh upload

1. Admin chon anh tren form
2. Client co the nen anh nhe truoc khi gui
3. API route nhan file
4. Server upload len Cloudinary
5. Luu `imageUrl` va `publicId` vao DB
6. Hien lai preview tren admin

### Khi xoa san pham

Can:

- Xoa record DB
- Xoa asset tren Cloudinary neu co `publicId`

## 10. Quan ly xac thuc admin

Phase 1 khong can auth phuc tap.

### Cach lam khuyen nghi

- 1 tai khoan admin duy nhat
- Login bang username/password
- Tao session cookie `httpOnly`
- Middleware chan route `/admin/*`

### Khong can o phase 1

- Dang ky admin
- Quen mat khau
- Role phan quyen nhieu cap
- OAuth

## 11. SEO va hieu nang

Du la web nho, van nen lam dung ngay tu dau:

- URL than thien: `/san-pham/[slug]`
- Metadata cho homepage, listing, detail
- `sitemap.ts`
- `robots.ts`
- Anh dung `next/image`
- Lazy load hinh
- Open Graph co anh dai dien

## 12. UI/UX dinh huong

Website mua ban tai khoan nen uu tien:

- Tin cay
- Nhanh
- De xem tren mobile
- Mua nhanh qua chat

Style de xuat:

- Nen sach, contrast ro
- Card san pham gon
- CTA noi bat
- Badge trang thai ro rang
- Khong nhieu hieu ung thua

Mau badge:

- `Con hang`: xanh
- `Da ban`: xam hoac do nhe
- `Noi bat`: vang hoac cam

## 12.1 Tham khao UI tu muataikhoanonline.com

Da tham khao homepage cua `https://muataikhoanonline.com/` vao ngay `2026-06-21` de lay dinh huong UI/UX cho du an nay.

### Cac pattern UI dang dung tren site tham khao

- Header co logo ro rang
- Menu dieu huong don gian
- Mega menu "Danh muc san pham" co nhieu nhom cap 1 va cap 2
- Hero text ngan, dan thang vao gia tri san pham
- Cum trust badge o dau trang: qua tang kem, chinh sach, bao hanh, ho tro 24/7
- Section san pham khuyen mai / hot
- Section san pham ban chay
- Section san pham moi nhat
- Section chia danh muc noi bat bang icon/thumbnail
- Section tin tuc cong nghe
- Section danh gia khach hang
- Section dang ky nhan tin khuyen mai
- Footer co thong tin cong ty, mang xa hoi, chinh sach, ho tro thanh toan

### Danh muc tren site tham khao

Site tham khao dang to chuc category theo huong rat de ban hang:

- Bao mat, VPN
- Do hoa, edit video
- Hoc tap, khoa hoc
- Key, phan mem ban quyen
- Nang cap dung luong
- Phan mem, cong cu AI

Tu do co the rut ra logic cho web cua minh:

- Category can hien thi som tren homepage
- Danh muc nen la thanh phan dieu huong chinh
- Moi category can co card dai dien hoac icon rieng

### Nhung diem nen hoc

- Flow ban hang rat truc dien, khach vao la thay ngay danh muc va san pham
- Tap trung vao san pham hot va san pham ban chay
- Nhieu tin hieu tao niem tin nhu bao hanh, ho tro, chinh sach
- Card san pham uu tien anh, ten va gia
- Co blog/tin tuc de ho tro SEO

### Nhung diem khong nen copy nguyen ban

- Khong nen mang nguyen theme WordPress/WooCommerce vao du an Next.js
- Khong nen de giao dien qua day thong tin ngay man hinh dau
- Khong nen lam menu qua nhieu tang neu so luong danh muc thuc te chua lon
- Khong nen phu thuoc vao slider nang neu khong thuc su can thiet

### Dinh huong UI ap dung cho project nay

Se tham khao tu site tren, nhung toi uu lai theo huong gon hon va hien dai hon:

- Header: logo + menu + CTA lien he nhanh
- Homepage hero: thong diep ngan, 1 banner chinh, 2 CTA ro rang
- Trust strip: 4 item ngang gom bao hanh, ho tro, giao nhanh, cam ket
- Category grid: 6-8 danh muc noi bat
- Product sections:
- San pham noi bat
- San pham ban chay
- San pham moi dang
- Blog preview: 3 bai viet moi nhat de phuc vu SEO
- Footer: chinh sach, lien he, mang xa hoi, domain thong bao

### Quy tac visual de ap dung

- Tong the sang, sach, de doc
- Dung card bo goc nhe, bong do rat vua phai
- Mau nhan CTA uu tien do/cam hoac xanh dam, tranh qua nhieu mau
- Gia san pham phai noi bat hon mo ta
- Badge `hot`, `noi bat`, `da ban`, `bao hanh` can dong bo
- Khoang trang rong hon site tham khao de giao dien bot chat

### Homepage wireframe de xuat sau khi tham khao

1. Header
2. Hero banner + CTA
3. Trust badges
4. Danh muc noi bat
5. San pham hot
6. San pham ban chay
7. San pham moi
8. Quy trinh mua hang
9. Danh gia / feedback
10. Blog / tin tuc
11. Footer

## 13. API can co trong phase 1

### Public

- `GET /api/products`
- `GET /api/products/[slug]`

### Admin

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PATCH /api/admin/products/[id]`
- `DELETE /api/admin/products/[id]`
- `POST /api/admin/media/upload`

## 14. Env vars can dung

```env
DATABASE_URL=postgresql://...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
ADMIN_AUTH_SECRET=your_long_random_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

Neu tach frontend/backend rieng ve sau, bo sung:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.vercel.app
BACKEND_URL=https://your-backend-domain.vercel.app
```

## 15. Ke hoach thuc hien 5-7 ngay

### Ngay 1

- Khoi tao project Next.js
- Cai Tailwind, Prisma, PostgreSQL
- Tao schema DB
- Setup Cloudinary
- Tao layout co ban

### Ngay 2

- Xay homepage
- Xay listing page
- Tao component card san pham
- Seed data mau

### Ngay 3

- Xay detail page
- Gallery hinh anh
- CTA lien he
- SEO metadata co ban

### Ngay 4

- Xay admin login
- Xay dashboard/products list
- Tao form them san pham

### Ngay 5

- Sua/xoa san pham
- Upload va quan ly anh
- Validation form
- Hoan thien responsive

### Ngay 6

- Test luong nguoi dung
- Test admin flow
- Sua bug
- Toi uu UI

### Ngay 7

- Deploy Vercel
- Setup domain
- Test production
- Ban giao source + huong dan env

## 16. Pham vi khong nam trong bao gia hien tai

Can ghi ro de tranh vo pham vi:

- Gio hang
- Thanh toan online
- Dang ky/dang nhap user khach
- Tu dong giao tai khoan sau thanh toan
- Nap vi / hoan tien
- Chat realtime
- Phan quyen nhieu admin
- He thong don hang phuc tap
- Bao cao doanh thu nang cao
- Tich hop CRM

## 17. Rui ro va luu y dac thu

Vi la website mua ban tai khoan, can luu y:

- Khong hien thong tin nhay cam cong khai
- Khong luu password tai khoan ban tren frontend
- Neu can luu credential de giao khach, nen tach sang phase sau voi ma hoa du lieu
- Can quy dinh ro tai khoan nao duoc phep giao dich theo chinh sach nen tang va phap ly

Neu phase 1 chi la website dang ban + lien he, thi an toan hon:

- Khong luu thong tin dang nhap that cua tai khoan tren website cong khai
- Chi dang thuoc tinh marketing cua san pham
- Chot don qua kenh rieng

## 18. Deploy len Vercel

### Frontend

- Day source len GitHub
- Import project vao Vercel
- Khai bao env vars
- Deploy production

### Database

De xuat:

- Neon Postgres
hoac
- Supabase Postgres

### Image

- Tao Cloudinary account
- Lay 3 bien:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Domain

- Khach hang tu dang ky va thanh toan
- Tro DNS ve Vercel

## 19. Chuan code va nguyen tac phat trien

- Dung TypeScript toan bo
- Tach component public va admin
- API validate bang `zod`
- Khong hardcode URL production
- Moi upload anh deu luu `publicId`
- Moi route admin deu can check auth
- Moi action xoa can co confirm
- Moi page can responsive mobile truoc

## 20. De xuat kickoff technical

Neu bat dau build ngay, thu tu hop ly la:

1. Khoi tao `Next.js 15 + TypeScript + Tailwind`
2. Cai `Prisma + PostgreSQL`
3. Tao schema `Product`, `ProductImage`, `AdminUser`
4. Setup `Cloudinary`
5. Dung homepage + listing + detail
6. Dung admin CRUD
7. Deploy `Vercel`

## 21. Ket luan

Huong phat trien tot nhat cho du an nay la:

- Mot codebase `Next.js`
- Deploy len `Vercel`
- Database `PostgreSQL + Prisma`
- Anh luu `Cloudinary`
- Admin CRUD don gian

Day la huong vua sat bao gia, vua de hoan thanh trong `5-7 ngay`, vua de nang cap ve sau thanh he thong lon hon.

Neu mo rong phase 2, co the them:

- Don hang
- Thanh toan
- Tai khoan thanh vien
- Tu dong giao account
- Dashboard thong ke
- Quan ly voucher
- He thong bao hanh
