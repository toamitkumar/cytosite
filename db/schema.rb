# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120410015359) do

  create_table "answers", :force => true do |t|
    t.string   "option",      :limit => 512, :null => false
    t.integer  "question_id"
    t.boolean  "correct"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "assessment_questions", :force => true do |t|
    t.integer  "assessment_id"
    t.integer  "question_id"
    t.integer  "order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "assessments", :force => true do |t|
    t.string   "name",                          :null => false
    t.string   "description",   :limit => 1024, :null => false
    t.string   "category_code", :limit => 20
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", :force => true do |t|
    t.string   "name",                     :null => false
    t.string   "code",       :limit => 20
    t.integer  "parent_id"
    t.integer  "level"
    t.integer  "sort_order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "image_tags", :force => true do |t|
    t.integer  "image_id"
    t.string   "note",       :limit => 512,                                :null => false
    t.string   "author",     :limit => 512,                                :null => false
    t.decimal  "left",                      :precision => 10, :scale => 5
    t.decimal  "top",                       :precision => 10, :scale => 5
    t.decimal  "width",                     :precision => 10, :scale => 5
    t.decimal  "height",                    :precision => 10, :scale => 5
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "images", :force => true do |t|
    t.string   "name",          :limit => 512,  :null => false
    t.string   "description",   :limit => 1024, :null => false
    t.string   "format",        :limit => 10
    t.string   "category_code", :limit => 20
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questions", :force => true do |t|
    t.string   "question",      :limit => 512,  :null => false
    t.string   "explanation",   :limit => 1024, :null => false
    t.string   "category_code", :limit => 10
    t.integer  "sort_order"
    t.boolean  "published"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "image_id"
  end

  create_table "user_assessments", :force => true do |t|
    t.integer  "user_id"
    t.integer  "assessment_id"
    t.string   "response",      :limit => 2000
    t.date     "end_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "name",                   :limit => 512,                 :null => false
    t.string   "email",                                 :default => "", :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "role"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
