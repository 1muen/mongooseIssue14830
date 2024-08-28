import mongoose, { Schema } from "mongoose";

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://admin:admin@mongo:27017", {
    dbName: "mongooseissue",
    autoIndex: true,
    ssl: false
}).catch((e) => {
    console.error(`MongoDB connection FAIL ${(e as Error).message}`);
    process.exit(1);
}).then(async (mong) => {
    console.log('Mongoose version:', mongoose.version)
    const TestSchema: Schema = new Schema(
        {
            tenantID: { type: String, required: true, index: true },
            instanceID: { type: String, required: true },
            test: { type: String, required: true },
        },
        { timestamps: { updatedAt: "lastEdited", createdAt: "created" } }
    );

    TestSchema.pre<any>("save", function (next) {
        this.lastEdited = new Date();
        next();
    });

    const TestModel = mong.model<any>("mongissue", TestSchema);
    await TestModel.deleteMany({})
    await TestModel.create({ tenantID: "1111", instanceID: "dev3", test: "test" })
    await TestModel.create({ tenantID: "1111", instanceID: "dev4", test: "test" })

    const updateTest = async (
        update: any,
        tenantID = "1111",
        instanceId = "dev4"
    ): Promise<any | null> => {
        const previousConfiguration: any = (
            await TestModel.findOneAndUpdate({ tenantID, instanceId }, update).lean().exec()
        );
        console.log("previousConfiguration:", previousConfiguration)
    };

    await updateTest({ test: "adsfasdfasdf" });
    console.log(await TestModel.find())
});