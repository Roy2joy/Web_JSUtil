import random;

for i in range(3,10):
    for j in range(1,4):
        print(
            "Product tempData"+str(i)+str(j)+" = new Product()\n{\nProductID = \"S21000"+str(i)+"\",\nBatchNumber = "+str(j)+",\nDemand = 3,\nAvailableStock =2000, \nUnitPrice=200,\nRate=4\n};\ncontext.Product.Add(tempData"+str(i)+str(j)+");\ncontext.SaveChanges();\n"
        )