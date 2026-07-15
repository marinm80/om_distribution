-- OM Distribution migration 004
-- Purpose: support one-or-more categories per product.
-- Target: MySQL 8.0
-- Production procedure: back up first, apply once, then run the verification
-- queries at the bottom. This migration does not drop the legacy category_id.

CREATE TABLE IF NOT EXISTS product_categories (
  product_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (product_id, category_id),
  KEY idx_product_categories_category_id (category_id),
  CONSTRAINT fk_product_categories_product
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_product_categories_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO product_categories (product_id, category_id)
SELECT id, category_id
FROM products
WHERE category_id IS NOT NULL;

-- Verification queries (read-only):
SELECT COUNT(*) AS relation_count
FROM product_categories;

SELECT COUNT(*) AS missing_backfills
FROM products p
LEFT JOIN product_categories pc
  ON pc.product_id = p.id AND pc.category_id = p.category_id
WHERE p.category_id IS NOT NULL
  AND pc.product_id IS NULL;

-- Rollback considerations:
-- 1. Deploy application code that no longer depends on category_ids.
-- 2. DROP TABLE product_categories;
