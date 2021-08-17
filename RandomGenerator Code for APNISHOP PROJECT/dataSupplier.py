

brandData=["HP",'DELL','','Dany','SamSung','Trancend','Intel','Radon','Nvdia','Huawei']


for i in range(3,10):
    print(
        "Supplier tempData"+str(i)+" = new Supplier()\n{\nSupplierID = \"S21000"+str(i)+"\",\nBusinessName = \""+brandData[i]+"\",\nBusinessContact = \"51247842155\",\nBusinessDescription = \"This is my business\",\nBusinessAddress = \"this is my business address\",\nBusinessWebsite = \"lenovo@gmail.com\",\nBusinessEmail = \"lenovo@gmail.com\"\n};\ncontext.Supplier.Add(tempData"+str(i)+");\ncontext.SaveChanges();\n"
    )