const generatePublicURL = (item, item_type) => {
    return `https://res.cloudinary.com/dcmetdbkq/${item_type}/upload/v${item.version}/${item.public_id}.${item_type == "image" ? "jpg" : "mp4"}`;
}

const saveResource = async (item, tier, item_type) => {
    const resourceModel = {
    title: item.public_id,
    tier: tier,
    url: generatePublicURL(item, item_type),
    // description: null,
    resource_type: item_type
    }
    
    console.log("Uploading", item, resourceModel);

    const {error: supabaseError} = await supabase.from("gallery")
                                    .insert([resourceModel]);

    if(supabaseError){
    console.log(supabaseError);
    return;
    }
}

const getImages = async () => {
    const tiers = ["Artifact", "Legendary", "Epic", "Rare"];

    tiers.forEach(async tier => {
    const image_url = `https://res.cloudinary.com/dcmetdbkq/image/list/gallary_${tier.toLowerCase()}.json`;
    const video_url = `https://res.cloudinary.com/dcmetdbkq/video/list/gallary_${tier.toLowerCase()}.json`;

    const [imageResponse, videoResponse] = await Promise.all([
        await fetch(image_url, {method: "GET"}),
        await fetch(video_url, {method: "GET"})
    ]);

    const [images, videos] = await Promise.all([
        imageResponse.status==200 ? await imageResponse.json() : {resources: []},
        videoResponse.status==200 ? await videoResponse.json() : {resources: []} 
    ]);

    images.resources.forEach(async item => await saveResource(item, tier, "image"));
    videos.resources.forEach(async item => await saveResource(item, tier, "video"));
    })
}