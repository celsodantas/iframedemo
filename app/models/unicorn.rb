class Unicorn < ActiveRecord::Base
  attr_accessible :magical_powers, :name  
  
  validates :name, presence: true
end
