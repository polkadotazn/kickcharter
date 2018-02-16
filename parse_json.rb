require "json"
json_from_file = File.read("myfile.json")
hash = JSON.parse(json_from_file)
