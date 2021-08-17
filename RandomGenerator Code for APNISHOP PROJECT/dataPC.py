import random;

categoryData=["Digital",'Electronic','Computer']
Title=['Ram','Keyboard','USB','GraphicCard','Touchpad','SSD','HDD','Charger','Processor','GamePad','IPOD','IPad','AirBook']

for i in range(3,10):
    print(
        "ProductCatalogue tempData"+str(i)+" = new ProductCatalogue()\n{\nProductID = \"S21000"+str(i)+"\",\nTitle = \""+Title[i]+"\",\nCategory = \""+categoryData[random.randint(0,2)]+"\",\nSupplierID = \"S21000"+str(i)+"\"\n};\ncontext.ProductCatalogue.Add(tempData"+str(i)+");\ncontext.SaveChanges();\n"
    )