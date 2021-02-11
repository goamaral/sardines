class User < ApplicationRecord

  # ENUMS #
  enum kind: { regular: 0, admin: 1 }, _suffix: true

  # EXTENSIONS #
  has_secure_password

  # RELATIONSHIPS #
  has_many :expressions, foreign_key: "author_id"

end
