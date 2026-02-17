for i in range(2): # <replace p="1.0" from='2' to='["2","3"]' />
    print("a") # <skipLine p="0.5" />
    for j in range(2): # <replace p="1.0" from='2' to='["i","2","3"]' />
        print("b")
        print("c") # <skipLine p="0.5" />