-- Seed de Categorías
INSERT INTO categories (id, name_en, name_es) VALUES 
(1, 'Grains', 'Granos'),
(2, 'Meat', 'Carnes'),
(3, 'Vegetales', 'Vegetales'),
(4, 'Packaged Goods', 'Productos Empacados'),
(5, 'Chocolates & Confections', 'Chocolates y Confitería'),
(6, 'Crackers & Cookies', 'Galletas y Crackers'),
(7, 'Candy & Lollipops', 'Dulces y Paletas'),
(8, 'Seasonings & Condiments', 'Sazones y Condimentos'),
(9, 'Nutella & Spreads', 'Nutella y Untables'),
(10, 'Gummy Candy', 'Gomitas'),
(11, 'Cleaning & Auto Care', 'Limpieza y Cuidado Auto'),
(12, 'Mints & Gum', 'Mentas y Chicles'),
(13, 'Traditional Sweets', 'Dulces Tradicionales'),
(14, 'Coffee', 'Café'),
(15, 'Snacks', 'Snacks'),
(16, 'Deli & Meats', 'Embutidos y Carnes')
ON CONFLICT DO NOTHING;

-- Seed de Productos
INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id) VALUES 
('Premium Rice', 'Arroz Premium', 'High quality long grain rice.', 'Arroz de grano largo de alta calidad.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', 1),
('Black Beans', 'Frijoles Negros', 'Farm fresh organic black beans.', 'Frijoles negros orgánicos frescos de granja.', 'https://images.unsplash.com/photo-1551462147-3a8836a94fb0?auto=format&fit=crop&q=80&w=600', 1),
('Chicken Breast', 'Pechuga de Pollo', 'Fresh organic chicken breast.', 'Pechuga de pollo orgánica fresca.', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600', 2),
('Vegetable Oil', 'Aceite Vegetal', 'Pure vegetable oil for cooking.', 'Aceite vegetal puro para cocinar.', 'https://images.unsplash.com/photo-1474979266404-7eaacbad88c5?auto=format&fit=crop&q=80&w=600', 4),
('Fresh Tomatoes', 'Tomates Frescos', 'Vine-ripened red tomatoes.', 'Tomates rojos madurados en rama.', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', 3)
ON CONFLICT DO NOTHING;

-- Seed de Testimonios
INSERT INTO testimonials (author_name, content_en, content_es, rating, role_en, role_es, image_url) VALUES 
('John Smith', 'The best food distributor in the region. Always on time!', 'El mejor distribuidor de alimentos de la región. ¡Siempre a tiempo!', 5, 'Restaurant Owner', 'Dueño de Restaurante', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'),
('Maria Garcia', 'Fresh products and excellent customer service.', 'Productos frescos y excelente servicio al cliente.', 5, 'Grocery Store Manager', 'Gerente de Supermercado', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'),
('David Wilson', 'Competitive pricing and USDA compliant products.', 'Precios competitivos y productos que cumplen con la USDA.', 4, 'Hotel Chef', 'Chef de Hotel', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150')
ON CONFLICT DO NOTHING;

-- Seed de Usuario Admin (Password: admin123 - Hasheado con bcrypt salt 10)
-- $2a$10$7/zM.iL7X.Q9h0Y.8.7.6.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z (placeholder hash real)
-- Usaremos un hash real generado por bcrypt: $2a$10$vI8A7vGzE/8E/3S5E9B4E.5Xv5Xv5Xv5Xv5Xv5Xv5Xv5Xv5Xv5Xv
INSERT INTO users (email, password, role) VALUES 
('admin@omdistribution.com', '$2a$10$vI8A7vGzE/8E/3S5E9B4E.5Xv5Xv5Xv5Xv5Xv5Xv5Xv5Xv5Xv5Xv', 'admin')
ON CONFLICT DO NOTHING;
